import { checkIsUserAuth } from "../model/auth/infrastructure/jwt.js";
import { fileLoader } from "../model/fileLoader/infrastructure/fileUpload.js";
import { albumRepository } from "../model/portfolio/infrastructure/albumRepository.js";
import { categoryRepository } from "../model/portfolio/infrastructure/categoryRepository.js";
import { collectionsRepository } from "../model/portfolio/infrastructure/collectionsRepository.js";

export default async function (fastify) {
  fastify.get("/collections", async function (req, reply) {
    const { category } = req.query;
    const currentCategory = await categoryRepository(
      fastify.mongo.db
    ).findByTitle(category);
    const collections = await collectionsRepository(fastify.mongo.db).getAll(
      currentCategory._id
    );
    if (!collections) {
      return reply.status(400).send({
        error: "Collections not found",
      });
    }
    return { data: collections };
  });

  fastify.post("/collection", async function (req, reply) {
    checkIsUserAuth(req, fastify.config.JWT_SECRET);
    const { filePath, fileBuffer, title, status, categoryId } =
      await fileLoader(req, "collections");
    const alreadyExist = await collectionsRepository(
      fastify.mongo.db
    ).alreadyExist(title);
    if (alreadyExist) {
      reply.status(409).send({ error: "Дана колекція вжу існує" });
    }
    const result = await collectionsRepository(fastify.mongo.db).create({
      title,
      photo: filePath,
      categoryId,
      status,
      buffer: fileBuffer,
    });
    return { data: result };
  });

  fastify.delete("/collection/:id", async function (req) {
    const { id } = req.params;
    const collection = await collectionsRepository(fastify.mongo.db).deleteById(
      id
    );
    await albumRepository(fastify.mongo.db).deleteManyById({
      categoryId: collection.categoryId,
      collectionId: collection._id,
    });
    return { message: "Success" };
  });

  fastify.get("/favorite-collections", async function () {
    const favorites = await collectionsRepository(
      fastify.mongo.db
    ).getFavorites();
    return { data: favorites };
  });
}
