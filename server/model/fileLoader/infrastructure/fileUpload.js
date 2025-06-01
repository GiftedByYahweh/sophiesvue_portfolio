import path from "node:path";
import fs from "node:fs";
import { pipeline } from "node:stream/promises";

export const fileLoader = async (data, folder) => {
  const file = await data.file();
  const fields = file.fields;
  const filePath = path.join(
    `static/${folder}`,
    `${Date.now()}-${file.filename}`
  );
  await pipeline(file.file, fs.createWriteStream(filePath));
  const fileBuffer = await file.toBuffer();
  return {
    filePath,
    fields,
    fileBuffer,
  };
};
