import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'node:stream';
import { FilesProvider, UploadFile } from './types';

export interface CloudinaryConfig {
  name?: string;
  key?: string;
  secret?: string;
}

const getPublicId = (url: string) => {
  const urlObj = new URL(url);
  const parts = urlObj.pathname.split('/');
  const uploadIndex = parts.findIndex((p) => p === 'upload');
  const publicIdParts = parts.slice(uploadIndex + 2);
  const last = publicIdParts.pop() ?? '';
  const withoutExt = last.replace(/\.[^/.]+$/, '');
  publicIdParts.push(withoutExt);
  return publicIdParts.join('/');
};

export class CloudinaryProvider implements FilesProvider {
  constructor(config: CloudinaryConfig) {
    cloudinary.config({
      cloud_name: config.name,
      api_key: config.key,
      api_secret: config.secret,
    });
  }

  async loadFile(file: UploadFile, folder: string) {
    const stream = Readable.from(file.buffer);
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      console.log('CLOUDINARY REQ');
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: `${Date.now()}-${file.filename}`,
        },
        (err, uploaded) => {
          if (err || !uploaded) return reject(err);
          resolve(uploaded);
        },
      );
      stream.pipe(uploadStream);
    });
    return { url: result.secure_url };
  }

  async deleteFile(url: string) {
    const publicId = getPublicId(url);
    await cloudinary.uploader.destroy(publicId);
  }

  async deleteFiles(urlArr: string[]) {
    const publicIds = urlArr.map((url) => getPublicId(url));
    await cloudinary.api.delete_resources(publicIds);
  }
}
