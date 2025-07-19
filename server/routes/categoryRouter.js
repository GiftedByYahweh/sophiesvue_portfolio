import { categoryRepository } from "../model/category/categoryRepository.js";
import { categoryService } from "../model/category/categoryService.js";

export default async function (fastify) {
  const db = fastify.mongo.db;

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
    handler: async function (req, reply) {
      const parts = req.parts();
      const newCategory = await categoryService(db).create(parts);
      return { data: newCategory };
    },
  });

  fastify.delete("/category/:id", {
    preHandler: fastify.authGuard,
    handler: async function (req, reply) {
      const { id } = req.params;
      const deleted = await categoryService(db).delete(id);
      return { data: deleted };
    },
  });
}
