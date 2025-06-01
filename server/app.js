"use strict";

const path = require("node:path");
const AutoLoad = require("@fastify/autoload");

const options = {};

module.exports = async function (fastify, opts) {
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
    prefix: "/api",
  });
};

module.exports.options = options;
