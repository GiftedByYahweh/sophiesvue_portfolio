import fp from "fastify-plugin";
import fastifyStatic from "@fastify/static";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default fp(async (fastify) => {
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "..", "static"),
    prefix: "/static/",
  });
});
