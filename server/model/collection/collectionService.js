import { ApiError } from "../../infrastructure/errorHandler.js";
import { COLLECTIONS_FOLDER } from "../../utils/fileFolders.js";
import { albumRepository } from "../album/albumRepository.js";
import { categoryRepository } from "../category/categoryRepository.js";
import { collectionsRepository } from "./collectionsRepository.js";

const create = async (parts, { db, fileLoader }) => {
  const { file, title, status, categoryId } = await fileLoader.read(parts);
  const alreadyExist = await collectionsRepository(db).alreadyExist({
    categoryId,
    title,
  });
  if (alreadyExist) ApiError.Conflict("Дана колекція вжу існує");
  const category = await categoryRepository(db).findById(categoryId);
  if (!category) ApiError.NotFound("Category doesn`t exist");
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
  if (!collections) ApiError.NotFound("This category is not found");
  return collections;
};

const getTitles = async (category, { db }) => {
  const collections =
    await collectionsRepository(db).findByCategoryTitles(category);
  return collections;
};

const getFavorites = async ({ db }) => {
  return await collectionsRepository(db).getFavorites();
};

const deleteCollection = async (id, { db }) => {
  const collection = await collectionsRepository(db).deleteById(id);
  const deleted = await albumRepository(db).deleteManyById({
    collectionId: collection._id,
  });
  return deleted;
};

export const collectionService = (db, fl) => {
  const fileLoader = fl.create(COLLECTIONS_FOLDER);
  return {
    create: (parts) => create(parts, { db, fileLoader }),
    getAll: (category) => getAll(category, { db }),
    getTitles: (category) => getTitles(category, { db }),
    getFavorites: () => getFavorites({ db }),
    deleteCollection: (id) => deleteCollection(id, { db }),
  };
};
