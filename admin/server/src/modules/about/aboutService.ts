import { AppError, ErrorCode } from '#common/appError';
import { FilesStorage } from '#filesStorage/filesStorage';
import { STORAGE_FOLDERS } from '#filesStorage/folders';
import { AboutRepository } from './aboutRepository';
import { UpdateAboutPayload } from './types';

export type AboutService = ReturnType<typeof aboutService>;

export function aboutService(
  aboutRepo: AboutRepository,
  filesStorage: FilesStorage,
) {
  async function get() {
    return aboutRepo.get();
  }

  async function update(id: string, payload: UpdateAboutPayload) {
    const about = await aboutRepo.findById(id);
    if (!about) throw new AppError(ErrorCode.NOT_FOUND, 'Профіль не знайдено');

    const newPhoto = await filesStorage.loadFile(
      payload.photo,
      STORAGE_FOLDERS.PROFILE_FOLDER,
    );
    const updated = await aboutRepo.update(id, {
      aboutInfo: payload.text,
      contactInfo: payload.contactInfo,
      photoLink: newPhoto ?? about.photoLink,
    });
    if (newPhoto) await filesStorage.deleteFile(about.photoLink);
    return updated;
  }

  return { get, update };
}
