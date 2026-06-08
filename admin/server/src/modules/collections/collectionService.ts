import { AppError, ErrorCode } from '#common/appError';
import { FilesStorage } from '#filesStorage/filesStorage';
import { STORAGE_FOLDERS } from '#filesStorage/folders';
import { UnitOfWork } from 'src/db/unitOfWork';
import { AlbumService } from '#modules/albums/albumService';
import { CollectionsRepository } from './collectionsRepository';
import { CreateCollectionPayload, UpdateCollectionPayload } from './types';
import { toBoolean } from '#utils/transform';

export type CollectionService = ReturnType<typeof collectionService>;

export function collectionService(
  collectionsRepo: CollectionsRepository,
  albumService: AlbumService,
  uow: UnitOfWork,
  filesStorage: FilesStorage,
) {
  async function getByCategoryId(categoryId: string) {
    return collectionsRepo.getByCategoryId(categoryId);
  }

  async function getNamesByCategoryId(categoryId: string) {
    return collectionsRepo.getNamesByCategoryId(categoryId);
  }

  async function getFavorites() {
    return collectionsRepo.getFavorites();
  }

  async function create(payload: CreateCollectionPayload) {
    const existing = await collectionsRepo.findByCategoryAndName(
      payload.categoryId,
      payload.name,
    );
    if (existing) {
      throw new AppError(
        ErrorCode.CONFLICT,
        `Колекція ${existing.name} вже існує`,
      );
    }
    const photoLink = await filesStorage.loadFile(
      payload.photo,
      STORAGE_FOLDERS.COLLECTIONS_FOLDER,
    );
    if (!photoLink) {
      throw new AppError(ErrorCode.VALIDATION_ERROR, 'Файл фото обовʼязковий');
    }
    return collectionsRepo.create({
      id: crypto.randomUUID(),
      slug: payload.slug,
      name: payload.name,
      photoLink,
      categoryId: payload.categoryId,
      isActive: true,
      isLiked: payload.isLiked ?? false,
      likedDate: payload.isLiked ? new Date() : undefined,
    });
  }

  async function update(id: string, payload: UpdateCollectionPayload) {
    const { name, photo, isActive, isLiked, slug } = payload;
    const collection = await collectionsRepo.findById(id);
    if (!collection) {
      throw new AppError(ErrorCode.NOT_FOUND, 'Колекцію не знайдено');
    }
    if (name !== collection.name) {
      const existing = await collectionsRepo.findByCategoryAndName(
        collection.categoryId,
        name,
      );
      if (existing && existing.id !== id) {
        throw new AppError(
          ErrorCode.CONFLICT,
          `Колекція ${existing.name} вже існує`,
        );
      }
    }
    const newPhoto = await filesStorage.loadFile(
      photo,
      STORAGE_FOLDERS.COLLECTIONS_FOLDER,
    );
    const updated = await collectionsRepo.update(id, {
      name,
      slug,
      isActive: toBoolean(isActive),
      isLiked: toBoolean(isLiked),
      likedDate: toBoolean(isLiked) ? new Date() : undefined,
      photoLink: newPhoto ?? collection.photoLink,
    });
    if (newPhoto) await filesStorage.deleteFile(collection.photoLink);
    return updated;
  }

  async function hide(id: string) {
    const collection = await collectionsRepo.findById(id);
    if (!collection) {
      throw new AppError(ErrorCode.NOT_FOUND, 'Колекцію не знайдено');
    }
    return collectionsRepo.update(id, { isActive: false });
  }

  async function restore(id: string) {
    const collection = await collectionsRepo.findById(id);
    if (!collection) {
      throw new AppError(ErrorCode.NOT_FOUND, 'Колекцію не знайдено');
    }
    return collectionsRepo.update(id, { isActive: true });
  }

  async function remove(id: string) {
    const collection = await collectionsRepo.findById(id);
    if (!collection) {
      throw new AppError(ErrorCode.NOT_FOUND, 'Колекцію не знайдено');
    }
    const deletedAlbumIds = await uow.run(async () => {
      const albums = await albumService.deleteByCollectionIds([id]);
      await collectionsRepo.delete(id);
      return albums.map((alb) => alb.photoLink);
    });
    const filesToDelete = [...deletedAlbumIds, collection.photoLink];
    await filesStorage.deleteFiles(filesToDelete);
    return filesToDelete;
  }

  async function deleteByCategoryId(categoryId: string) {
    const collections = await collectionsRepo.getByCategoryId(categoryId);
    const ids = collections.map((c) => c.id);
    const deletedAlbums = await albumService.deleteByCollectionIds(ids);
    const deletedCollections =
      await collectionsRepo.deleteByCategoryId(categoryId);
    const albumIds = deletedAlbums.map((alb) => alb.photoLink);
    const collectionIds = deletedCollections.map((coll) => coll.photoLink);
    return { albumIds, collectionIds };
  }

  return {
    getByCategoryId,
    getNamesByCategoryId,
    getFavorites,
    create,
    update,
    hide,
    restore,
    delete: remove,
    deleteByCategoryId,
  };
}
