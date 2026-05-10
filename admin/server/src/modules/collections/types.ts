import { UploadFile } from '#filesStorage/types';

export interface CreateCollectionPayload {
  name: string;
  categoryId: string;
  photo: UploadFile;
  isLiked?: boolean;
}
