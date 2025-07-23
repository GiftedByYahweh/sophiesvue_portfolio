const editProfile = async (parts, { db, fileLoader }) => {};

export const profileService = ({ db, fileLoader }) => ({
  edit: (parts) => editProfile(parts, { db, fileLoader }),
});
