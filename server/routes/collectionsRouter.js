"use strict";

const {
  collectionsRepository,
} = require("../model/portfolio/infrastructure/collectionsRepository");
const { fileLoader } = require("../model/fileLoader/infrastructure/fileUpload");
const { checkIsUserAuth } = require("../model/auth/infrastructure/jwt");

module.exports = async function (fastify) {
  fastify.get("/collections", async function (req, reply) {
    const { category } = req.query;
    const collections = await collectionsRepository(fastify.mongo.db).getAll(
      category
    );
    if (!collections) {
      return reply.status(400).send({
        data: null,
        error: "Collections not found",
      });
    }
    return { data: collections, error: null };
  });

  fastify.post("/collection", async function (req, reply) {
    checkIsUserAuth(req, fastify.config.JWT_SECRET);
    const { filePath, fileBuffer, title, status, categoryId } =
      await fileLoader(req, "collections");
    const alreadyExist = await collectionsRepository(
      fastify.mongo.db
    ).findByTitle(title);
    if (alreadyExist) {
      reply.status(409).send({ error: "Дана колекція вжу існує" });
    }
    await collectionsRepository(fastify.mongo.db).create({
      title,
      photo: filePath,
      categoryId,
      status,
      buffer: fileBuffer,
    });
    return { data: title, error: null };
  });

  fastify.delete("/collection/:id", async function (req) {
    const { id } = req.params;
    await collectionsRepository(fastify.mongo.db).deleteById(id);
    return { data: true, error: null };
  });

  fastify.get("/favorite-collections", async function () {
    const favorites = await collectionsRepository(
      fastify.mongo.db
    ).getFavorites();
    return { data: favorites, error: null };
  });
};
