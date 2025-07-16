import { albumRepository } from "../model/album/albumRepository.js";

export default async function (fastify) {
  const db = fastify.mongo.db;

  fastify.get("/album", async function (req) {
    const { collection } = req.query;
    const album = await albumRepository(db).getAll(collection);
    if (!album) reply.status(400).send({ error: "Albums not found" });
    return { data: album };
  });
}
