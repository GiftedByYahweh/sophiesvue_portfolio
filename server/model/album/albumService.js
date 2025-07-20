import { FileLoader } from "../../infrastructure/fileUpload.js";
import { albumRepository } from "./albumRepository.js";
import { collectionsRepository } from "../collection/collectionsRepository.js";

const fileLoader = new FileLoader("albums");

const create = async (db, { parts }) => {
  const { collectionId, ...files } = await fileLoader.read(parts);
  for (const key in files) {
    const filePath = await fileLoader.loadFile(files[key]);
    await albumRepository(db).create({ photo: filePath, collectionId });
  }
  return;
};

const getAll = async (db, { collection }) => {
  const currentCollection =
    await collectionsRepository(db).findByTitle(collection);
  const albums = await albumRepository(db).getAll(currentCollection?._id);
  return albums;
};

export const albumService = (db) => ({
  create: (parts) => create(db, { parts }),
  getAll: (collection) => getAll(db, { collection }),
});
