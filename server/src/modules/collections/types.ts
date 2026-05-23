import { UploadFile } from '#filesStorage/types';

export interface CreateCollectionPayload {
  name: string;
  slug: string;
  categoryId: string;
  photo: UploadFile;
  isLiked?: boolean;
}

export interface UpdateCollectionPayload {
  name: string;
  isActive: string;
  isLiked: string;
  slug: string;
  photo?: UploadFile;
}
