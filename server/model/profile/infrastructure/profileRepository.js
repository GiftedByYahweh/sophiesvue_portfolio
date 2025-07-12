export const profileRepository = (mongo) => {
  const profileModel = mongo.collection("profile");

  return {
    async get() {
      const profile = await profileModel.findOne();
      return profile;
    },
    async edit(profile) {
      const updated = await profileModel.findOneAndUpdate(
        {},
        {
          $set: {
            text: profile.text,
            photo: profile.filePath,
            inst: profile.inst,
            buffer: profile.fileBuffer,
          },
        }
      );
      return updated;
    },
  };
};
