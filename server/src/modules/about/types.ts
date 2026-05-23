import { UploadFile } from '#filesStorage/types';

export interface UpdateAboutPayload {
  text: string;
  contactInfo: string;
  photo?: UploadFile;
}
