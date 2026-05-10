import { UploadFile } from '#filesStorage/types';

export interface CreateAlbumPayload {
  name: string;
  collectionId: string;
  photo: UploadFile;
  type?: string;
}
