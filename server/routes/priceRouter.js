import { priceService } from "../model/price/priceService.js";

export default async function (fastify) {
  const service = priceService(fastify.mongo.db, fastify.fileLoader);

  fastify.get("/price", async function () {
    const price = await service.getAll();
    return { data: price };
  });

  fastify.post("/price", {
    preHandler: fastify.authGuard,
    handler: async function (req) {
      const parts = req.parts();
      const price = await service.create(parts);
      return { data: price };
    },
  });

  fastify.put("/price", {
    preHandler: fastify.authGuard,
    handler: async function (req) {
      const parts = req.parts();
      const price = await service.editPrice(parts);
      return { data: price };
    },
  });
}
