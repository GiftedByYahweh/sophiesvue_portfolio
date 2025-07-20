import { ApiError } from "../../infrastructure/errorHandler.js";
import { FileLoader } from "../../infrastructure/fileUpload.js";
import { categoryRepository } from "../category/categoryRepository.js";
import { collectionsRepository } from "./collectionsRepository.js";

const fileLoader = new FileLoader("collections");

const create = async (db, { parts }) => {
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

const getAll = async (db, category) => {
  const currentCategory = await categoryRepository(db).findByTitle(category);
  const collections = await collectionsRepository(db).getAll(
    currentCategory?._id
  );
  if (!collections) return ApiError.NotFound("This category is not found");
  return collections;
};

const getTitles = async (db, category) => {
  const collections =
    await collectionsRepository(db).findByCategoryTitles(category);
  return collections;
};

const deleteCollection = async (db, id) => {};

export const collectionService = (db) => ({
  create: (parts) => create(db, { parts }),
  getAll: (category) => getAll(db, category),
  deleteCollection: (id) => deleteCollection(db, id),
  getTitles: (category) => getTitles(db, category),
});
