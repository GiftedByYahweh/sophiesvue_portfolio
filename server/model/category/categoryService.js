import { ApiError } from "../../infrastructure/errorHandler.js";
import {
  ALBUM_FOLDER,
  CATEGORIES_FOLDER,
  COLLECTIONS_FOLDER,
  PRICE_FOLDER,
} from "../../utils/fileFolders.js";
import { albumRepository } from "../album/albumRepository.js";
import { collectionsRepository } from "../collection/collectionsRepository.js";
import { priceRepository } from "../price/priceRepository.js";
import { categoryRepository } from "./categoryRepository.js";

const createCategory = async (parts, { db, fileLoader }) => {
  const { file, title } = await fileLoader.read(parts);
  const alreadyExist = await categoryRepository(db).findByTitle(title);
  if (alreadyExist) ApiError.Conflict("Дана категорія вжу існує");
  const filePath = await fileLoader.loadFile(file);
  const newCategory = await categoryRepository(db).createOne({
    title: title,
    photo: filePath,
  });
  return newCategory;
};

const deleteCategory = async (categoryId, { db, fileLoaders }) => {
  const collections =
    await collectionsRepository(db).deleteByCategoryId(categoryId);
  for (const collection of collections) {
    await fileLoaders.collection.deleteFile(collection?.photo);
    const albums = await albumRepository(db).deleteByCollectionId(
      collection?._id
    );
    for (const album of albums) {
      await fileLoaders.album.deleteFile(album?.photo);
    }
  }
  const category = await categoryRepository(db).deleteById(categoryId);
  const price = await priceRepository(db).deleteByCategory(category.title);
  await fileLoaders.price.deleteFile(price?.photo);
  await fileLoaders.category.deleteFile(category.photo);
  return category;
};

const getAll = async ({ db }) => {
  return await categoryRepository(db).getAll();
};

const getTitles = async ({ db }) => {
  return await categoryRepository(db).getTitles();
};

export const categoryService = (db, fl) => {
  const fileLoaders = {
    category: fl.create(CATEGORIES_FOLDER),
    collection: fl.create(COLLECTIONS_FOLDER),
    album: fl.create(ALBUM_FOLDER),
    price: fl.create(PRICE_FOLDER),
  };
  return {
    create: (parts) =>
      createCategory(parts, { db, fileLoader: fileLoaders.category }),
    delete: (categoryId) => deleteCategory(categoryId, { db, fileLoaders }),
    getAll: () => getAll({ db }),
    getTitles: () => getTitles({ db }),
  };
};
