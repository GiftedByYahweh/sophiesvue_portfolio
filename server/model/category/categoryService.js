import { ApiError } from "../../infrastructure/errorHandler.js";
import { FileLoader } from "../../infrastructure/fileUpload.js";
import { collectionsRepository } from "../collection/collectionsRepository.js";
import { categoryRepository } from "./categoryRepository.js";

const createCategory = async (db, { parts }) => {
  const fileLoader = new FileLoader("categories");
  const { file, title } = await fileLoader.read(parts);
  const alreadyExist = await categoryRepository(db).findByTitle(title);
  if (alreadyExist) return ApiError.Conflict("Дана категорія вжу існує");
  const filePath = await fileLoader.loadFile(file);
  const newCategory = await categoryRepository(db).createOne({
    title: title,
    photo: filePath,
  });
  return newCategory;
};

const deleteCategory = async (db, { categoryId }) => {
  await collectionsRepository(db).deleteByCategoryId(categoryId);
  const deletedCategory = await categoryRepository(db).deleteById(categoryId);
  return deletedCategory;
};

export const categoryService = (db) => ({
  create: (parts) => createCategory(db, { parts }),
  delete: (categoryId) => deleteCategory(db, { categoryId }),
});
