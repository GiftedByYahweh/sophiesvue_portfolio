import { UploadFile } from '#filesStorage/types';

export interface CreateAlbumPayload {
  collectionId: string;
  photo: UploadFile;
  type?: string;
}

export interface UpdateAlbumPayload {
  isActive: string;
  type: string;
  photo?: UploadFile;
}
