import { profileRepository } from "../model/profile/profileRepository.js";
import { fileLoader } from "../infrastructure/fileUpload.js";

export default async function (fastify) {
  fastify.get("/profile", async function (req, reply) {
    const profile = await profileRepository(fastify.mongo.db).get();
    return { data: profile, error: null };
  });

  fastify.post("/profile", {
    preHandler: fastify.auth,
    handler: async function (req, reply) {
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
      return { data: profile };
    },
  });
}
