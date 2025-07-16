import { fileLoader } from "../infrastructure/fileUpload.js";
import { albumRepository } from "../model/album/albumRepository.js";
import { categoryRepository } from "../model/category/categoryRepository.js";
import { collectionsRepository } from "../model/collection/collectionsRepository.js";

export default async function (fastify) {
  const db = fastify.mongo.db;

  fastify.get("/collections", async function (req, reply) {
    const { category } = req.query;
    const currentCategory = await categoryRepository(db).findByTitle(category);
    const collections = await collectionsRepository(fdb).getAll(
      currentCategory._id
    );
    if (!collections) {
      return reply.status(400).send({
        error: "Collections not found",
      });
    }
    return { data: collections };
  });

  fastify.post("/collection", {
    preHandler: fastify.authGuard,
    handler: async function (req, reply) {
      const { filePath, fileBuffer, title, status, categoryId } =
        await fileLoader(req, "collections");
      const alreadyExist = await collectionsRepository(db).alreadyExist(title);
      if (alreadyExist) {
        reply.status(409).send({ error: "Дана колекція вжу існує" });
      }
      const result = await collectionsRepository(db).create({
        title,
        photo: filePath,
        categoryId,
        status,
        buffer: fileBuffer,
      });
      return { data: result };
    },
  });

  fastify.delete("/collection/:id", {
    preHandler: fastify.authGuard,
    handler: async function (req) {
      const { id } = req.params;
      const collection = await collectionsRepository(db).deleteById(id);
      const deleted = await albumRepository(db).deleteManyById({
        categoryId: collection.categoryId,
        collectionId: collection._id,
      });
      return { message: deleted };
    },
  });

  fastify.get("/favorite-collections", async function () {
    const favorites = await collectionsRepository(
      fastify.mongo.db
    ).getFavorites();
    return { data: favorites };
  });
}
