import { fileLoader } from "../../infrastructure/fileUpload";
import { categoryRepository } from "./categoryRepository";

const createCategory = async (parts) => {
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

export const categoryService = {
  createCategory: createCategory,
};
