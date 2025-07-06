"use strict";

const Fastify = require("fastify");
const AutoLoad = require("@fastify/autoload");
const path = require("node:path");

const build = async () => {
  const fastify = Fastify();

  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
  });

  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    prefix: "/api",
  });

  await fastify.ready();

  return fastify;
};

module.exports = build;
