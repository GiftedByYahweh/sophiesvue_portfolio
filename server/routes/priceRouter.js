import { priceService } from "../model/price/priceService.js";

export default async function (fastify) {
  const service = priceService(fastify.mongo.db, fastify.fileLoader);

  fastify.get("/price", async function () {
    const price = await service.getAll();
    return { data: price };
  });

  fastify.post("/price", {
    preHandler: fastify.authGuard,
    handler: async function (req, reply) {
      const parts = req.parts();
      const price = await service.create(parts);
      return { data: price };
    },
  });

  fastify.put("/price", {
    preHandler: fastify.authGuard,
    handler: async function (req, reply) {
      // const { filePath, price, description, importantInfo, photo, category } =
      //   await fileLoader(req, "price");
      // const profile = await priceRepository(fastify.mongo.db).update({
      //   category,
      //   importantInfo,
      //   description,
      //   price,
      //   photo: filePath || photo,
      // });
      // return { data: profile };
    },
  });
}
