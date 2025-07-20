import { albumService } from "../model/album/albumService.js";

export default async function (fastify) {
  const db = fastify.mongo.db;

  fastify.get("/album", async function (req) {
    const { collection } = req.query;
    const album = await albumService(db).getAll(collection);
    return { data: album };
  });

  fastify.post("/album", {
    preHandler: fastify.authGuard,
    handler: async function (req) {
      const parts = req.parts();
      const album = await albumService(db).create(parts);
      return { data: album };
    },
  });
}
