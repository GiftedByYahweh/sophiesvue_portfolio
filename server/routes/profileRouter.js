"use strict";

const {
  profileRepository,
} = require("../model/profile/infrastructure/profileRepository");
const { fileLoader } = require("../model/fileLoader/infrastructure/fileUpload");

module.exports = async function (fastify) {
  fastify.get("/profile", async function (req, reply) {
    const profile = await profileRepository(fastify.mongo.db).get();
    return { data: profile, error: null };
  });
};
