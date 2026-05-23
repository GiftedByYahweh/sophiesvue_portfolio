import type { IncomingMessage, ServerResponse } from 'http';
import { getApp } from '../server/vercel-start';

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const fastify = await getApp();
  fastify.server.emit('request', req, res);
}
