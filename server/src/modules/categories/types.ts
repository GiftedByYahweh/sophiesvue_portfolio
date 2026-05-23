import { UploadFile } from '#filesStorage/types';

export interface CreateCategoryPayload {
  name: string;
  slug: string;
  photo: UploadFile;
}

export interface UpdateCategoryPayload {
  name: string;
  isActive: string;
  slug: string;
  photo?: UploadFile;
}
