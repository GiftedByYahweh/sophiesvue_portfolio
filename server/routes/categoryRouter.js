import { fileLoader } from "../model/fileLoader/infrastructure/fileUpload.js";
import { categoryRepository } from "../model/portfolio/infrastructure/categoryRepository.js";
import { checkIsUserAuth } from "../model/auth/infrastructure/jwt.js";

export default async function (fastify) {
  fastify.get("/categories", async function () {
    const categories = await categoryRepository(fastify.mongo.db).getAll();
    return { data: categories, error: null };
  });

  fastify.get("/category-titles", async function () {
    const categories = await categoryRepository(
      fastify.mongo.db
    ).getAllTitles();
    return { data: categories, error: null };
  });

  fastify.post("/category", async function (req, reply) {
    checkIsUserAuth(req, fastify.config.JWT_SECRET);
    const { filePath, title, fileBuffer } = await fileLoader(req, "categories");
    const alreadyExist = await categoryRepository(fastify.mongo.db).findByTitle(
      title
    );
    if (alreadyExist) {
      return reply
        .status(400)
        .send({ data: null, error: "Дана категорія вжу існує" });
    }
    await categoryRepository(fastify.mongo.db).createOne({
      title,
      photo: filePath,
      buffer: fileBuffer,
    });
    return { data: title, error: null };
  });

  fastify.delete("/category/:id", async function (req, reply) {
    checkIsUserAuth(req, fastify.config.JWT_SECRET);
    const { id } = req.params;
    await categoryRepository(fastify.mongo.db).deleteById(id);
    return { data: true, error: null };
  });
}
