import { ApiError } from "../../infrastructure/errorHandler.js";
import { FileLoader } from "../../infrastructure/fileUpload.js";
import { albumRepository } from "../album/albumRepository.js";
import { collectionsRepository } from "../collection/collectionsRepository.js";
import { categoryRepository } from "./categoryRepository.js";

const createCategory = async (parts, { db, fileLoader }) => {
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

const deleteCategory = async (
  categoryId,
  { db, albumFileLoader, categoryFileLoader, collectionsFileLoader }
) => {
  const collections =
    await collectionsRepository(db).deleteByCategoryId(categoryId);
  for (const collection of collections) {
    await collectionsFileLoader.deleteFile(collection.photo);
    const albums = await albumRepository(db).deleteByCollectionId(
      collection?._id
    );
    for (const album of albums) {
      await albumFileLoader.deleteFile(album.photo);
    }
  }
  const category = await categoryRepository(db).deleteById(categoryId);
  await categoryFileLoader.deleteFile(category.photo);
  return category;
};

export const categoryService = (db) => {
  const albumFileLoader = new FileLoader("albums");
  const categoryFileLoader = new FileLoader("categories");
  const collectionsFileLoader = new FileLoader("collections");
  return {
    create: (parts) =>
      createCategory(parts, { db, fileLoader: categoryFileLoader }),
    delete: (categoryId) =>
      deleteCategory(categoryId, {
        db,
        albumFileLoader,
        categoryFileLoader,
        collectionsFileLoader,
      }),
  };
};
