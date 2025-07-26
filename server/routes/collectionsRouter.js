import { collectionService } from "../model/collection/collectionService.js";

export default async function (fastify) {
  const service = collectionService(fastify.mongo.db, fastify.fileLoader);

  fastify.get("/collections", async function (req) {
    const { category } = req.query;
    const collections = await service.getAll(category);
    return { data: collections };
  });

  fastify.post("/collection", {
    preHandler: fastify.authGuard,
    handler: async function (req) {
      const parts = req.parts();
      const collection = await service.create(parts);
      return { data: collection };
    },
  });

  fastify.delete("/collection/:id", {
    preHandler: fastify.authGuard,
    handler: async function (req) {
      const { id } = req.params;
      const collection = await service.deleteCollection(id);
      return { data: collection };
    },
  });

  fastify.get("/favorite-collections", async function () {
    const favorites = await service.getFavorites();
    return { data: favorites };
  });

  fastify.get("/collection-titles", async function (req) {
    const { category } = req.query;
    const titles = await service.getTitles(category);
    return { data: titles };
  });
}
