import { categoryRepository } from "../model/category/categoryRepository.js";
import { checkIsUserAuth } from "../infrastructure/jwt.js";
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

  fastify.post("/category", async function (req, reply) {
    const token = req.headers.authorization.split(" ")[1];
    checkIsUserAuth(token, fastify.config.JWT_SECRET);
    const parts = req.parts();
    const newCategory = await categoryService(db).createCategory(parts);
    return { data: newCategory };
  });

  fastify.delete("/category/:id", { p }, async function (req, reply) {
    checkIsUserAuth(req, fastify.config.JWT_SECRET);
    const { id } = req.params;
    const deleted = await categoryRepository(db).deleteById(id);
    return { data: deleted };
  });
}
