import path from "node:path";
import fs from "node:fs";

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
    if (!file || !file.buffer) return;
    const filePath = this.#createFileName(file.filename);
    await fs.promises.writeFile(filePath, file.buffer);
    return filePath;
  }

  async deleteFile(filePath) {
    await fs.promises.unlink(filePath, (err) => console.log(err));
  }

  static create(folder) {
    return new FileLoader(folder);
  }

  #createFileName(filename) {
    return path.join(`static/${this.#folder}`, `${Date.now()}-${filename}`);
  }
}
