import { authService } from "../model/auth/authService.js";

export default async function (fastify) {
  const service = authService(fastify.mongo.db);

  fastify.post("/login", async function (req) {
    const { username, password } = req.body;
    const userToken = await service.login(
      { username, password },
      fastify.config.JWT_SECRET
    );
    return { data: userToken };
  });
}
