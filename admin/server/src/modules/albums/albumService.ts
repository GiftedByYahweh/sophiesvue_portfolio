import { AppError, ErrorCode } from '#common/appError';
import { FilesStorage } from '#filesStorage/filesStorage';
import { STORAGE_FOLDERS } from '#filesStorage/folders';
import { AlbumsRepository } from './albumsRepository';
import { CreateAlbumPayload, UpdateAlbumPayload } from './types';
import { toBoolean } from '#utils/transform';

export type AlbumService = ReturnType<typeof albumService>;

export function albumService(
  albumsRepo: AlbumsRepository,
  filesStorage: FilesStorage,
) {
  async function getByCollectionId(collectionId: string) {
    return albumsRepo.getByCollectionId(collectionId);
  }

  async function create(payload: CreateAlbumPayload) {
    const photoLink = await filesStorage.loadFile(
      payload.photo,
      STORAGE_FOLDERS.ALBUMS_FOLDER,
    );
    if (!photoLink) {
      throw new AppError(ErrorCode.VALIDATION_ERROR, 'Файл фото обовʼязковий');
    }
    return albumsRepo.create({
      id: crypto.randomUUID(),
      photoLink,
      collectionId: payload.collectionId,
      isActive: true,
      type: payload.type ?? 'normal',
    });
  }

  async function update(id: string, payload: UpdateAlbumPayload) {
    const { photo, isActive, type } = payload;
    const album = await albumsRepo.findById(id);
    if (!album) {
      throw new AppError(ErrorCode.NOT_FOUND, 'Альбом не знайдено');
    }
    const newPhoto = await filesStorage.loadFile(
      photo,
      STORAGE_FOLDERS.ALBUMS_FOLDER,
    );
    const updated = await albumsRepo.update(id, {
      type,
      isActive: toBoolean(isActive),
      photoLink: newPhoto ?? album.photoLink,
    });
    if (newPhoto) await filesStorage.deleteFile(album.photoLink);
    return updated;
  }

  async function hide(id: string) {
    const album = await albumsRepo.findById(id);
    if (!album) throw new AppError(ErrorCode.NOT_FOUND, 'Альбом не знайдено');
    return albumsRepo.update(id, { isActive: false });
  }

  async function restore(id: string) {
    const album = await albumsRepo.findById(id);
    if (!album) throw new AppError(ErrorCode.NOT_FOUND, 'Альбом не знайдено');
    return albumsRepo.update(id, { isActive: true });
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
    update,
    hide,
    restore,
    delete: remove,
    deleteByCollectionIds,
  };
}
