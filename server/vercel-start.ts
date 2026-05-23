import type { FastifyInstance } from 'fastify';
import { app } from './index';
import { loadAppConfig } from './src/config';

const config = loadAppConfig();

let cached: Promise<FastifyInstance> | null = null;

export const getApp = (): Promise<FastifyInstance> => (cached ??= app(config));
