import path from "node:path";
import fastifyAutoload from "@fastify/autoload";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function (fastify, opts) {
  await fastify.register(fastifyAutoload, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  await fastify.register(fastifyAutoload, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
    prefix: "/api",
  });
}
