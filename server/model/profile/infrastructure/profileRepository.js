"use strict";

const { PROFILE_NAME } = require("../../../utils/mongodb");

module.exports.profileRepository = (mongo) => {
  const profileModel = mongo.collection(PROFILE_NAME);

  return {
    async get() {
      const profile = await profileModel.findOne();
      return profile;
    },
  };
};
