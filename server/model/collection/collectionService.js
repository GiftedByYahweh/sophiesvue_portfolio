import { ApiError } from "../../infrastructure/errorHandler.js";
import { COLLECTIONS_FOLDER } from "../../utils/fileFolders.js";
import { categoryRepository } from "../category/categoryRepository.js";
import { collectionsRepository } from "./collectionsRepository.js";

const create = async (parts, { db, fileLoader }) => {
  const { file, title, status, categoryId } = await fileLoader.read(parts);
  const alreadyExist = await collectionsRepository(db).alreadyExist({
    categoryId,
    title,
  });
  if (alreadyExist) return ApiError.Conflict("Дана колекція вжу існує");
  const category = await categoryRepository(db).findById(categoryId);
  if (!category) return ApiError.NotFound("Category doesn`t exist");
  const filePath = await fileLoader.loadFile(file);
  const result = await collectionsRepository(db).create({
    title,
    photo: filePath,
    categoryId: category._id,
    categoryTitle: category.title,
    status,
  });
  return result;
};

const getAll = async (category, { db }) => {
  const currentCategory = await categoryRepository(db).findByTitle(category);
  const collections = await collectionsRepository(db).getAll(
    currentCategory?._id
  );
  if (!collections) return ApiError.NotFound("This category is not found");
  return collections;
};

const getTitles = async (category, { db }) => {
  const collections =
    await collectionsRepository(db).findByCategoryTitles(category);
  return collections;
};

const deleteCollection = async (id, { db }) => {};

export const collectionService = (db, fl) => {
  const fileLoader = fl.create(COLLECTIONS_FOLDER);
  return {
    create: (parts) => create(parts, { db, fileLoader }),
    getAll: (category) => getAll(category, { db }),
    deleteCollection: (id) => deleteCollection(id, { db }),
    getTitles: (category) => getTitles(category, { db }),
  };
};
