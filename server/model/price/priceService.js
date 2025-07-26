import { ApiError } from "../../infrastructure/errorHandler.js";
import { PRICE_FOLDER } from "../../utils/fileFolders.js";
import { priceRepository } from "./priceRepository.js";

const createPrice = async (parts, { db, fileLoader }) => {
  const { file, price, description, importantInfo, category } =
    await fileLoader.read(parts);
  const priceExist = await priceRepository(db).findOne(category);
  if (priceExist) ApiError.Conflict("This price already exist");
  const filePath = await fileLoader.loadFile(file);
  const profile = await priceRepository(db).create({
    category,
    importantInfo,
    description,
    price,
    photo: filePath,
  });
  return profile;
};

const editPrice = async (parts, { db, fileLoader }) => {
  const { file, prevPhoto, price, description, importantInfo, category } =
    await fileLoader.read(parts);
  const filePath = await fileLoader.loadFile(file);
  const editedPrice = await priceRepository(db).edit({
    category,
    importantInfo,
    description,
    price,
    photo: filePath || prevPhoto,
  });
  return editedPrice;
};

const getAll = async ({ db }) => {
  return await priceRepository(db).getAll();
};

export const priceService = (db, fl) => {
  const fileLoader = fl.create(PRICE_FOLDER);
  return {
    create: (parts) => createPrice(parts, { db, fileLoader }),
    editPrice: (parts) => editPrice(parts, { db, fileLoader }),
    getAll: () => getAll({ db }),
  };
};
