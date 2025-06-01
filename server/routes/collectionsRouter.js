"use strict";

const {
  collectionsRepository,
} = require("../model/portfolio/infrastructure/collectionsRepository");
const { fileLoader } = require("../model/fileLoader/infrastructure/fileUpload");

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
    const { filePath, fields, fileBuffer } = await fileLoader(
      req,
      "collections"
    );
    const title = fields.title?.value;
    const liked = fields.liked?.value;
    const categoryId = fields.categoryId?.value;
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
      liked,
      buffer: fileBuffer,
    });
    return { data: title, error: null };
  });

  fastify.delete("/collection/:id", async function (req) {
    const { id } = req.params;
    await collectionsRepository(fastify.mongo.db).deleteById(id);
    return { data: true, error: null };
  });
};
