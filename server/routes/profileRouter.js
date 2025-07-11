import { profileRepository } from "../model/profile/infrastructure/profileRepository.js";
import { fileLoader } from "../model/fileLoader/infrastructure/fileUpload.js";

export default async function (fastify) {
  fastify.get("/profile", async function (req, reply) {
    const profile = await profileRepository(fastify.mongo.db).get();
    return { data: profile, error: null };
  });

  fastify.post("/profile", async function (req, reply) {
    const { filePath, text, inst, photo, fileBuffer } = await fileLoader(
      req,
      "profile"
    );
    const profile = await profileRepository(fastify.mongo.db).edit({
      text,
      inst,
      filePath: filePath || photo,
      fileBuffer,
    });
    return { data: profile, error: null };
  });
}
