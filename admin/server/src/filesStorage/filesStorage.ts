import { FilesProvider, UploadFile } from './types';

export type FilesStorage = ReturnType<typeof filesStorage>;

export function filesStorage(provider: FilesProvider) {
  async function loadFile(file: UploadFile | undefined, folder: string) {
    if (!file || !file.buffer) return;
    const created = await provider.loadFile(file, folder);
    return created.url;
  }

  async function deleteFile(url: string) {
    if (!url) return;
    await provider.deleteFile(url);
  }

  async function deleteFiles(urlArr: string[]) {
    if (!urlArr.length) return;
    await provider.deleteFiles(urlArr);
  }

  return { loadFile, deleteFile, deleteFiles };
}
