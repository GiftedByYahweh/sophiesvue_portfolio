import { ApiError } from "../../infrastructure/errorHandler.js";
import { fileLoader } from "../../infrastructure/fileUpload.js";
import { collectionsRepository } from "./collectionsRepository.js";

export const createCollection = async (db, { parts }) => {
  const { filePath, fileBuffer, title, status, categoryId } = await fileLoader(
    parts,
    "collections"
  );
  const alreadyExist = await collectionsRepository(db).alreadyExist({
    categoryId,
    title,
  });
  if (alreadyExist) return ApiError.Conflict("Дана колекція вжу існує");
  const result = await collectionsRepository(db).create({
    title,
    photo: filePath,
    categoryId,
    status,
    buffer: fileBuffer,
  });
  return result;
};

export const collectionService = (db) => ({
  create: (parts) => createCollection(db, { parts }),
});
