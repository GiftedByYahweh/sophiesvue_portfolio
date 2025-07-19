import { albumRepository } from "../model/album/albumRepository.js";
import { categoryRepository } from "../model/category/categoryRepository.js";
import { collectionService } from "../model/collection/collectionService.js";
import { collectionsRepository } from "../model/collection/collectionsRepository.js";

export default async function (fastify) {
  const db = fastify.mongo.db;

  fastify.get("/collections", async function (req, reply) {
    const { category } = req.query;
    const currentCategory = await categoryRepository(db).findByTitle(category);
    const collections = await collectionsRepository(db).getAll(
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
      const parts = req.parts();
      const collection = await collectionService(db).create(parts);
      return { data: collection };
    },
  });

  fastify.delete("/collection/:id", {
    preHandler: fastify.authGuard,
    handler: async function (req) {
      const { id } = req.params;
      const collection = await collectionsRepository(db).deleteById(id);
      const deleted = await albumRepository(db).deleteManyById({
        collectionId: collection._id,
      });
      return { message: deleted };
    },
  });

  fastify.get("/favorite-collections", async function () {
    const favorites = await collectionsRepository(db).getFavorites();
    return { data: favorites };
  });
}
