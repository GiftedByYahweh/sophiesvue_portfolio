import { profileService } from "../model/profile/profileService.js";

export default async function (fastify) {
  const service = profileService(fastify.mongo.db, fastify.fileLoader);

  fastify.get("/profile", async function () {
    const profile = await service.get();
    return { data: profile };
  });

  fastify.post("/profile", {
    preHandler: fastify.authGuard,
    handler: async function (req) {
      const parts = req.parts();
      const profile = await service.edit(parts);
      return { data: profile };
    },
  });
}
