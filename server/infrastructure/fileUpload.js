import path from "node:path";
import fs from "node:fs";
import { pipeline } from "node:stream/promises";

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
