import { albumRepository } from "./albumRepository.js";
import { ALBUM_FOLDER } from "../../utils/fileFolders.js";
import { collectionsRepository } from "../collection/collectionsRepository.js";

const getAll = async (collection, { db }) => {
  const currentCollection =
    await collectionsRepository(db).findByTitle(collection);
  const albums = await albumRepository(db).getAll(currentCollection?._id);
  return albums;
};

const create = async (parts, { db, fileLoader }) => {
  const { collectionId, ...files } = await fileLoader.read(parts);
  for (const key in files) {
    const filePath = await fileLoader.loadFile(files[key]);
    await albumRepository(db).create({ photo: filePath, collectionId });
  }
  return collectionId;
};

export const albumService = (db, fl) => {
  const fileLoader = fl.create(ALBUM_FOLDER);
  return {
    create: (parts) => create(parts, { db, fileLoader }),
    getAll: (collection) => getAll(collection, { db, fileLoader }),
  };
};
