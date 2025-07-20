import path from "node:path";
import fs from "node:fs";
import { pipeline } from "node:stream/promises";

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
        result[part.fieldname] = {
          filename: part.filename,
          buffer,
        };
      } else {
        result[part.fieldname] = part.value;
      }
    }
    return result;
  }

  async loadFile(file) {
    const filePath = this.#createFileName(file.filename);
    await fs.promises.writeFile(filePath, file.buffer);
    return filePath;
  }

  async deleteFile(filePath) {
    await fs.promises.unlink(filePath, (err) => console.log(err));
  }

  #createFileName(filename) {
    return path.join(`static/${this.#folder}`, `${Date.now()}-${filename}`);
  }
}

export const fileLoader = async (parts, folder) => {
  const result = {};
  for await (const part of parts) {
    if (part.type === "file") {
      const filePath = createFileName(part, folder);
      await pipeline(part.file, fs.createWriteStream(filePath));
      const fileBuffer = await part.toBuffer();
      result.filePath = filePath;
      result.fileBuffer = fileBuffer;
    } else {
      result[part.fieldname] = part.value;
    }
  }
  return result;
};

const createFileName = (file, folder) => {
  return path.join(`static/${folder}`, `${Date.now()}-${file.filename}`);
};
