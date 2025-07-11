import fp from "fastify-plugin";
import fastifyMultipart from "@fastify/multipart";

export default fp(async (fastify) => {
  fastify.register(fastifyMultipart, {
    limits: {
      fileSize: 10 * 1024 * 1024,
      fieldNameSize: 100,
      fieldSize: 1024 * 1024,
      fields: 10,
      files: 20,
      headerPairs: 2000,
      parts: 1000,
    },
  });
});
