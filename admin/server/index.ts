import type { FastifyInstance } from 'fastify';
import { createAppContainer } from './src/container';
import { AppConfig } from './src/config';
import { createServer } from './src/server';
import { ConsoleLogger } from 'src/logger/consoleLogger';

export const app = async (config: AppConfig): Promise<FastifyInstance> => {
  const logger = new ConsoleLogger();

  const container = createAppContainer(config);
  logger.info('Server', 'App Container created');

  return createServer({ container, config, logger });
};
