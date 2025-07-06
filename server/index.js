"use strict";

const build = require("./app.js");

module.exports = async (req, res) => {
  const fastify = await build();
  fastify.server.emit("request", req, res);
};
