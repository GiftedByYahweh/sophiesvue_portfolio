import { AppError, ErrorCode } from '#common/appError';
import { FilesStorage } from '#filesStorage/filesStorage';
import { ALBUMS_FOLDER } from '#filesStorage/folders';
import { AlbumsRepository } from './albumsRepository';
import { CreateAlbumPayload } from './types';

export type AlbumService = ReturnType<typeof albumService>;

export function albumService(
  albumsRepo: AlbumsRepository,
  filesStorage: FilesStorage,
) {
  async function getByCollectionId(collectionId: string) {
    return albumsRepo.getByCollectionId(collectionId);
  }

  async function create(payload: CreateAlbumPayload) {
    const photoLink = await filesStorage.loadFile(payload.photo, ALBUMS_FOLDER);
    if (!photoLink) {
      throw new AppError(ErrorCode.VALIDATION_ERROR, 'Файл фото обовʼязковий');
    }
    return albumsRepo.create({
      id: crypto.randomUUID(),
      name: payload.name,
      photoLink,
      collectionId: payload.collectionId,
      isActive: true,
      type: payload.type ?? 'normal',
    });
  }

  async function remove(id: string) {
    const album = await albumsRepo.findById(id);
    if (!album) {
      throw new AppError(ErrorCode.NOT_FOUND, 'Альбом не знайдено');
    }
    const deleted = await albumsRepo.delete(id);
    await filesStorage.deleteFile(album.photoLink);
    return deleted;
  }

  async function deleteByCollectionIds(collectionIds: string[]) {
    return albumsRepo.deleteByCollectionIds(collectionIds);
  }

  return {
    getByCollectionId,
    create,
    delete: remove,
    deleteByCollectionIds,
  };
}
