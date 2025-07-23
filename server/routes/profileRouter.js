import { profileRepository } from "../model/profile/profileRepository.js";
import { FileLoader } from "../infrastructure/fileUpload.js";

export default async function (fastify) {
  fastify.get("/profile", async function () {
    const profile = await profileRepository(fastify.mongo.db).get();
    return { data: profile, error: null };
  });

  fastify.post("/profile", {
    preHandler: fastify.authGuard,
    handler: async function (req) {
      // const parts = req.parts();
      // const { filePath, text, inst, photo, fileBuffer } = await fileLoader(
      //   parts,
      //   "profile"
      // );
      // const profile = await profileRepository(fastify.mongo.db).edit({
      //   text,
      //   inst,
      //   filePath: filePath || photo,
      //   fileBuffer,
      // });
      // return { data: profile };
    },
  });
}
