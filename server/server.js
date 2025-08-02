import Fastify from "fastify";
import app from "./app.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(app);

export default async (req, res) => {
  await fastify.ready();
  fastify.server.emit("request", req, res);
};
