"use strict";

const { PROFILE_NAME } = require("../../../utils/mongodb");

module.exports.profileRepository = (mongo) => {
  const profileModel = mongo.collection(PROFILE_NAME);

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
