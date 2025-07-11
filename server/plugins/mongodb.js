import fp from "fastify-plugin";
import fastifyMongo from "@fastify/mongodb";

export default fp(
  async (fastify) => {
    fastify.register(fastifyMongo, {
      forceClose: true,
      url: fastify.config.DB_CONNECTION_URL,
    });
  },
  {
    name: "mongo",
    dependencies: ["env"],
  }
);
