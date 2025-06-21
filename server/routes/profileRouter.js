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

  fastify.post("/profile", async function (req, reply) {
    const { filePath, text, inst, photo, fileBuffer } = await fileLoader(
      req,
      "profile"
    );
    const profile = await profileRepository(fastify.mongo.db).edit({
      text,
      inst,
      filePath: filePath || photo,
      fileBuffer,
    });
    return { data: profile, error: null };
  });
};
