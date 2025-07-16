import { priceRepository } from "../model/price/priceRepository.js";
import { fileLoader } from "../infrastructure/fileUpload.js";

export default async function (fastify) {
  const db = fastify.mongo.db;

  fastify.get("/price", async function () {
    const price = await priceRepository(db).get();
    return { data: price };
  });

  fastify.post("/price", {
    preHandler: fastify.authGuard,
    handler: async function (req, reply) {
      const { filePath, price, description, importantInfo, category } =
        await fileLoader(req, "price");
      const priceExist = await priceRepository(db).findOne(category);
      if (priceExist) {
        return reply.status(409).send({
          error: "This price already exist",
        });
      }
      const profile = await priceRepository(db).create({
        category,
        importantInfo,
        description,
        price,
        photo: filePath,
      });
      return { data: profile };
    },
  });

  fastify.put("/price", {
    preHandler: fastify.authGuard,
    handler: async function (req, reply) {
      const { filePath, price, description, importantInfo, photo, category } =
        await fileLoader(req, "price");
      const profile = await priceRepository(fastify.mongo.db).update({
        category,
        importantInfo,
        description,
        price,
        photo: filePath || photo,
      });
      return { data: profile };
    },
  });
}
