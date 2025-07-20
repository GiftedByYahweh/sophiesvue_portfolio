import { authService } from "../model/auth/authService.js";

export default async function (fastify) {
  const db = fastify.mongo.db;

  fastify.post("/login", async function (req, reply) {
    const { username, password } = req.body;
    const userToken = await authService(db).login(
      { username, password },
      fastify.config.JWT_SECRET
    );
    return { data: userToken };
  });
}
