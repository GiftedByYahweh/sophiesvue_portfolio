import { albumRepository } from "../model/portfolio/infrastructure/albumRepository.js";

export default async function (fastify) {
  fastify.get("/album", async function (req) {
    const { collection } = req.query;
    const album = await albumRepository(fastify.mongo.db).getAll(collection);
    if (!album) {
      return reply.status(400).send({
        data: null,
        error: "Albums not found",
      });
    }
    return { data: album, error: null };
  });
}
