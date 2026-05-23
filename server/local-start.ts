import 'dotenv/config';
import { app } from './index';
import { loadAppConfig } from './src/config';

const config = loadAppConfig();

app(config)
  .then(async (server) => {
    await server.listen({ port: config.port, host: config.host });
    console.log(`Application run on PORT ${config.port}`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
