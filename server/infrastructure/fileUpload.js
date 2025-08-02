import cloudinary from "./cloudinary.js";
import { Readable } from "node:stream";

export class FileLoader {
  #folder;

  constructor(folder) {
    this.#folder = folder;
  }

  async read(parts) {
    const result = {};
    for await (const part of parts) {
      if (part.type === "file") {
        const buffer = await part.toBuffer();
        const fileName = part.filename.trim().replace(/\s+/g, "_");
        result[part.fieldname] = {
          filename: fileName,
          buffer,
        };
      } else {
        result[part.fieldname] = part.value;
      }
    }
    return result;
  }

  async loadFile(file) {
    if (!file || !file.buffer) return;
    const stream = Readable.from(file.buffer);
    const cloudinaryFile = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: this.#folder,
          public_id: `${Date.now()}-${file.filename}`,
        },
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
      stream.pipe(uploadStream);
    });
    return cloudinaryFile.secure_url;
  }

  async deleteFile(filePath) {
    if (!filePath) return;
    const publicId = this.#getPublicId(filePath);
    await cloudinary.uploader.destroy(publicId);
  }

  static create(folder) {
    return new FileLoader(folder);
  }

  #getPublicId(url) {
    const urlObj = new URL(url);
    const parts = urlObj.pathname.split("/");
    const uploadIndex = parts.findIndex((p) => p === "upload");
    const publicIdParts = parts.slice(uploadIndex + 2);
    const last = publicIdParts.pop();
    const withoutExt = last.replace(/\.[^/.]+$/, "");
    publicIdParts.push(withoutExt);
    return publicIdParts.join("/");
  }
}
