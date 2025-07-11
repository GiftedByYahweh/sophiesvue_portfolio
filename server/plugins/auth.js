import fastifyPlugin from "fastify-plugin";
import fastifyAuth from "@fastify/auth";

export default fastifyPlugin(async function (fastify, opts) {
  fastify.register(fastifyAuth);
});
