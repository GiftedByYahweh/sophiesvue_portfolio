"use strict";

const {
  priceRepository,
} = require("../model/price/infrastructure/priceRepository");
const { fileLoader } = require("../model/fileLoader/infrastructure/fileUpload");
const { checkIsUserAuth } = require("../model/auth/infrastructure/jwt");

module.exports = async function (fastify) {
  fastify.get("/price", async function () {
    const price = await priceRepository(fastify.mongo.db).get();
    return { data: price, error: null };
  });

  fastify.post("/price", async function (req, reply) {
    checkIsUserAuth(req, fastify.config.JWT_SECRET);
    const { filePath, price, description, importantInfo, category } =
      await fileLoader(req, "price");
    const priceExist = await priceRepository(fastify.mongo.db).findOne(
      category
    );
    if (priceExist) {
      return reply.status(409).send({
        data: null,
        error: "This price already exist",
      });
    }
    const profile = await priceRepository(fastify.mongo.db).create({
      category,
      importantInfo,
      description,
      price,
      photo: filePath,
    });
    return { data: profile, error: null };
  });

  fastify.put("/price", async function (req, reply) {
    checkIsUserAuth(req, fastify.config.JWT_SECRET);
    const { filePath, price, description, importantInfo, photo, category } =
      await fileLoader(req, "price");
    const profile = await priceRepository(fastify.mongo.db).update({
      category,
      importantInfo,
      description,
      price,
      photo: filePath || photo,
    });
    return { data: profile, error: null };
  });
};
