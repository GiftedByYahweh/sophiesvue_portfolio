import { createToken } from "../infrastructure/jwt.js";
import { authRepository } from "../model/auth/authRepository.js";
import { comparePasswords } from "../infrastructure/hash.js";

export default async function (fastify) {
  const db = fastify.mongo.db;

  fastify.post("/login", async function (req, reply) {
    const { username, password } = req.body;
    if (!username || !password) {
      return reply.status(400).send({ error: "Invalid data" });
    }
    const currentUser = await authRepository(db).findUser(username);
    if (!currentUser) {
      return reply.status(400).send({ error: "Wrong username or password" });
    }
    const isPasswordCorrect = await comparePasswords(
      password,
      currentUser.password
    );
    if (!isPasswordCorrect) {
      return reply.status(400).send({ error: "Wrong username or password" });
    }
    const token = createToken(
      { id: currentUser._id },
      fastify.config.JWT_SECRET
    );
    return { data: token };
  });
}
