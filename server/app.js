import path from "node:path";
import fastifyAutoload from "@fastify/autoload";
import { fileURLToPath } from "node:url";
import { authGuard } from "./guards/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function (fastify, opts) {
  await fastify.register(fastifyAutoload, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  fastify.decorate("authGuard", authGuard(fastify.config.JWT_SECRET));

  fastify.setErrorHandler(function (error, request, reply) {
    this.log.error(error);
    const SYSTEM_ERROR = "Something went wrong, please try again";

    const errStatus = error.status ?? 500;
    const isSystemError = errStatus >= 500;

    const errMessage = isSystemError ? SYSTEM_ERROR : error.message;
    reply.status(errStatus).send({ data: null, error: errMessage });
  });

  await fastify.register(fastifyAutoload, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
    prefix: "/api",
  });
}
