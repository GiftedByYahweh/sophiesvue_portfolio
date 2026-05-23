import { AppError, ErrorCode } from '#common/appError';
import { FilesStorage } from '#filesStorage/filesStorage';
import { STORAGE_FOLDERS } from '#filesStorage/folders';
import { UnitOfWork } from 'src/db/unitOfWork';
import { CollectionService } from '#modules/collections/collectionService';
import { CategoriesRepository } from './categoriesRepository';
import { CreateCategoryPayload, UpdateCategoryPayload } from './types';
import { toBoolean } from '#utils/transform';

export type CategoryService = ReturnType<typeof categoryService>;

export function categoryService(
  categoriesRepo: CategoriesRepository,
  collectionService: CollectionService,
  uow: UnitOfWork,
  filesStorage: FilesStorage,
) {
  async function getAll() {
    return categoriesRepo.getAll();
  }

  async function getNames() {
    return categoriesRepo.getNames();
  }

  async function create(payload: CreateCategoryPayload) {
    const { slug, name, photo } = payload;
    const existing = await categoriesRepo.findByName(name);
    if (existing) {
      throw new AppError(
        ErrorCode.CONFLICT,
        `Категорія ${existing.name} вже існує`,
      );
    }
    const photoLink = await filesStorage.loadFile(
      photo,
      STORAGE_FOLDERS.CATEGORIES_FOLDER,
    );
    if (!photoLink) {
      throw new AppError(ErrorCode.VALIDATION_ERROR, 'Файл фото обовʼязковий');
    }
    return categoriesRepo.create({
      id: crypto.randomUUID(),
      slug,
      name: payload.name,
      photoLink,
      isActive: true,
    });
  }

  async function update(id: string, payload: UpdateCategoryPayload) {
    const { name, slug, photo, isActive } = payload;
    const category = await categoriesRepo.findById(id);
    if (!category) {
      throw new AppError(ErrorCode.NOT_FOUND, 'Категорію не знайдено');
    }
    if (name !== category.name) {
      const existing = await categoriesRepo.findByName(name);
      if (existing && existing.id !== id) {
        throw new AppError(
          ErrorCode.CONFLICT,
          `Категорія ${existing.name} вже існує`,
        );
      }
    }
    const newPhoto = await filesStorage.loadFile(
      photo,
      STORAGE_FOLDERS.CATEGORIES_FOLDER,
    );
    const updated = await categoriesRepo.update(id, {
      name,
      slug,
      isActive: toBoolean(isActive),
      photoLink: newPhoto ?? category.photoLink,
    });
    if (newPhoto) await filesStorage.deleteFile(category.photoLink);
    return updated;
  }

  async function hide(id: string) {
    const category = await categoriesRepo.findById(id);
    if (!category) {
      throw new AppError(ErrorCode.NOT_FOUND, 'Категорію не знайдено');
    }
    return categoriesRepo.update(id, { isActive: false });
  }

  async function restore(id: string) {
    const category = await categoriesRepo.findById(id);
    if (!category) {
      throw new AppError(ErrorCode.NOT_FOUND, 'Категорію не знайдено');
    }
    return categoriesRepo.update(id, { isActive: true });
  }

  async function remove(id: string) {
    const category = await categoriesRepo.findById(id);
    if (!category) {
      throw new AppError(ErrorCode.NOT_FOUND, 'Категорію не знайдено');
    }
    const { collectionIds, albumIds } = await uow.run(async () => {
      const result = await collectionService.deleteByCategoryId(id);
      await categoriesRepo.delete(id);
      return result;
    });
    const filesToDelete = [...albumIds, ...collectionIds, category.photoLink];
    await filesStorage.deleteFiles(filesToDelete);
    return filesToDelete;
  }

  return { getAll, getNames, create, update, hide, restore, delete: remove };
}
