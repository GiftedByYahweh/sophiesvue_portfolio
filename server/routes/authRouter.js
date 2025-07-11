import { createToken } from "../model/auth/infrastructure/jwt.js";
import { authRepository } from "../model/auth/infrastructure/authRepository.js";
import { comparePasswords } from "../model/auth/infrastructure/hash.js";

export default async function (fastify) {
  fastify.post("/login", async function (req, reply) {
    const { username, password } = req.body;
    if (!username || !password) {
      return reply.status(400).send({
        data: null,
        error: "Invalid data",
      });
    }
    const currentUser = await authRepository(fastify.mongo.db).findUser(
      username
    );
    if (!currentUser) {
      return reply.status(400).send({
        data: null,
        error: "Wrong username or password",
      });
    }
    const isPasswordCorrect = await comparePasswords(
      password,
      currentUser.password
    );
    if (!isPasswordCorrect) {
      return reply.status(400).send({
        data: null,
        error: "Wrong username or password",
      });
    }
    const token = createToken(
      { id: currentUser._id },
      fastify.config.JWT_SECRET
    );
    return { data: token, error: null };
  });
}
