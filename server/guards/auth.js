import { validateToken } from "../infrastructure/jwt.js";

export const authGuard = (jwt_secret) =>
  async function authGuard(req, reply) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      validateToken(token, jwt_secret);
    } catch (err) {
      reply.status(401).send({ error: "Unauthorized" });
    }
  };
