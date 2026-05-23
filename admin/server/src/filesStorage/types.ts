export interface UploadFile {
  filename: string;
  buffer: Buffer;
}

export interface FilesProvider {
  loadFile(file: UploadFile, folder: string): Promise<{ url: string }>;
  deleteFile(publicId: string): Promise<void>;
  deleteFiles(publicIds: string[]): Promise<void>;
}
