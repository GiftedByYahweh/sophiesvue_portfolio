import Fastify from "fastify";

const fastify = Fastify({
    logger: true,
});

fastify.get("/", function (request, reply) {
    reply.send({ hello: "world" });
});

fastify.get("/tests", function (request, reply) {
    reply.send({ hello: "asdfasdasdasdsda" });
});

const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        console.log("Server run");
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
