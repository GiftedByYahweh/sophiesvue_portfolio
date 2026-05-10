import { AppError, ErrorCode } from '#common/appError';
import { FilesStorage } from '#filesStorage/filesStorage';
import { CATEGORIES_FOLDER } from '#filesStorage/folders';
import { UnitOfWork } from 'src/db/unitOfWork';
import { CollectionService } from '#modules/collections/collectionService';
import { CategoriesRepository } from './categoriesRepository';
import { CreateCategoryPayload } from './types';

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
    const existing = await categoriesRepo.findByName(payload.name);
    if (existing) {
      throw new AppError(
        ErrorCode.CONFLICT,
        `Категорія ${existing.name} вже існує`,
      );
    }
    const photoLink = await filesStorage.loadFile(
      payload.photo,
      CATEGORIES_FOLDER,
    );
    if (!photoLink) {
      throw new AppError(ErrorCode.VALIDATION_ERROR, 'Файл фото обовʼязковий');
    }
    return categoriesRepo.create({
      id: crypto.randomUUID(),
      name: payload.name,
      photoLink,
      isActive: true,
    });
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

  return { getAll, getNames, create, delete: remove };
}
