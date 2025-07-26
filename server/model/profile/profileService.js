import { profileRepository } from "./profileRepository.js";
import { PROFILE_FOLDER } from "../../utils/fileFolders.js";

const getProfile = async ({ db }) => {
  return await profileRepository(db).get();
};

const editProfile = async (parts, { db, fileLoader }) => {
  const { file, text, inst, prevPhoto, fileBuffer } =
    await fileLoader.read(parts);
  const filePath = await fileLoader.loadFile(file);
  const profile = await profileRepository(db).edit({
    text,
    inst,
    filePath: filePath || prevPhoto,
    fileBuffer,
  });
  return profile;
};

export const profileService = (db, fl) => {
  const fileLoader = fl.create(PROFILE_FOLDER);
  return {
    get: () => getProfile({ db }),
    edit: (parts) => editProfile(parts, { db, fileLoader }),
  };
};
