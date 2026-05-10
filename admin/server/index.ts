import 'dotenv/config';
import { createAppContainer } from './src/container';
import { loadAppConfig } from './src/config';
import { createServer } from './src/server';
import { ConsoleLogger } from 'src/logger/consoleLogger';

export const app = async () => {
  const config = loadAppConfig();
  const logger = new ConsoleLogger();

  const container = createAppContainer(config);
  logger.info('Server', 'App Container created');

  const server = await createServer({ container, config, logger });
  await server.listen({ port: config.port, host: config.host });
  logger.info('Server', `Application run on PORT ${config.port}`);
  return container;
};

app().catch((err) => {
  console.error(err);
  process.exit(1);
});
