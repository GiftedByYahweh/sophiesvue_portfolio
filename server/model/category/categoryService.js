import { fileLoader } from "../../infrastructure/fileUpload.js";
import { categoryRepository } from "./categoryRepository.js";

const createCategory = async (db, { parts }) => {
  const { filePath, title, fileBuffer } = await fileLoader(parts, "categories");
  const alreadyExist = await categoryRepository(db).findByTitle(title);
  if (alreadyExist) throw new Error("Дана категорія вжу існує");
  const newCategory = await categoryRepository(db).createOne({
    title,
    photo: filePath,
    buffer: fileBuffer,
  });
  return newCategory;
};

export const categoryService = (db) => ({
  createCategory: (parts) => createCategory(db, { parts }),
});
