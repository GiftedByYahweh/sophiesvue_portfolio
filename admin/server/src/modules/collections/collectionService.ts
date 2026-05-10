import { AppError, ErrorCode } from '#common/appError';
import { FilesStorage } from '#filesStorage/filesStorage';
import { COLLECTIONS_FOLDER } from '#filesStorage/folders';
import { UnitOfWork } from 'src/db/unitOfWork';
import { AlbumService } from '#modules/albums/albumService';
import { CollectionsRepository } from './collectionsRepository';
import { CreateCollectionPayload } from './types';

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
      COLLECTIONS_FOLDER,
    );
    if (!photoLink) {
      throw new AppError(ErrorCode.VALIDATION_ERROR, 'Файл фото обовʼязковий');
    }
    return collectionsRepo.create({
      id: crypto.randomUUID(),
      name: payload.name,
      photoLink,
      categoryId: payload.categoryId,
      isActive: true,
      isLiked: payload.isLiked ?? false,
    });
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
    delete: remove,
    deleteByCategoryId,
  };
}
