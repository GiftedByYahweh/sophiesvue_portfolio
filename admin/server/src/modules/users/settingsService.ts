import { AppError, ErrorCode } from '#common/appError';
import { FilesStorage } from '#filesStorage/filesStorage';
import { STORAGE_FOLDERS } from '#filesStorage/folders';
import { SettingsRepository } from './settingsRepository';

export type SettingsService = ReturnType<typeof settingsService>;

export interface UpdateSettingsPayload {
  instLink: string;
  mainSubTitle: string;
  mainTitleColor: string;
  mainHeaderColor: string;
  photo?: import('#filesStorage/types').UploadFile;
}

export function settingsService(
  settingsRepo: SettingsRepository,
  filesStorage: FilesStorage,
) {
  async function get() {
    return settingsRepo.get();
  }

  async function update(payload: UpdateSettingsPayload) {
    const settings = await settingsRepo.get();
    if (!settings) throw new AppError(ErrorCode.NOT_FOUND, 'Налаштування не знайдено');

    const newPhoto = await filesStorage.loadFile(payload.photo, STORAGE_FOLDERS.SETTINGS_FOLDER);
    const updated = await settingsRepo.update(settings.id, {
      instLink: payload.instLink,
      mainSubTitle: payload.mainSubTitle,
      mainTitleColor: payload.mainTitleColor,
      mainHeaderColor: payload.mainHeaderColor,
      mainPhotoLink: newPhoto ?? settings.mainPhotoLink,
    });
    if (newPhoto) await filesStorage.deleteFile(settings.mainPhotoLink);
    return updated;
  }

  return { get, update };
}
