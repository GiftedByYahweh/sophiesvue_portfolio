import { categoryRepository } from "../model/category/categoryRepository.js";
import { categoryService } from "../model/category/categoryService.js";

export default async function (fastify) {
  const service = categoryService(fastify.mongo.db, fastify.fileLoader);

  fastify.get("/categories", async function () {
    const categories = await categoryRepository(db).getAll();
    return { data: categories };
  });

  fastify.get("/category-titles", async function () {
    const categories = await categoryRepository(db).getAllTitles();
    return { data: categories };
  });

  fastify.post("/category", {
    preHandler: fastify.authGuard,
    handler: async function (req) {
      const parts = req.parts();
      const newCategory = await service.create(parts);
      return { data: newCategory };
    },
  });

  fastify.delete("/category/:id", {
    preHandler: fastify.authGuard,
    handler: async function (req) {
      const { id } = req.params;
      const deleted = await service.delete(id);
      return { data: deleted };
    },
  });
}
