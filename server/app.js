import path from "node:path";
import fastifyAutoload from "@fastify/autoload";
import { fileURLToPath } from "node:url";
import { authGuard } from "./guards/auth.js";
import { FileLoader } from "./infrastructure/fileUpload.js";
import { httpErrorHandler } from "./infrastructure/httpErrorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function (fastify, opts) {
  await fastify.register(fastifyAutoload, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  fastify.decorate("authGuard", authGuard(fastify.config.JWT_SECRET));
  fastify.decorate("fileLoader", FileLoader);
  fastify.setErrorHandler(httpErrorHandler);

  await fastify.register(fastifyAutoload, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
    prefix: "/api",
  });
}
