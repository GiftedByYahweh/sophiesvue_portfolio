import { albumService } from "../model/album/albumService.js";

export default async function (fastify) {
  const service = albumService(fastify.mongo.db, fastify.fileLoader);

  fastify.get("/album", async function (req) {
    const { collection } = req.query;
    const album = await service.getAll(collection);
    return { data: album };
  });

  fastify.post("/album", {
    preHandler: fastify.authGuard,
    handler: async function (req) {
      const parts = req.parts();
      const album = await service.create(parts);
      return { data: album };
    },
  });

  fastify.delete("/album/:id", {
    preHandler: fastify.authGuard,
    handler: async function (req) {
      const { id } = req.params;
      const deleted = await service.delete(id);
      return { data: deleted };
    },
  });
}
