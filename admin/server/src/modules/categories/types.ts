import { UploadFile } from '#filesStorage/types';

export interface CreateCategoryPayload {
  name: string;
  photo: UploadFile;
}
