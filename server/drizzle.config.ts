import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { loadAppConfig } from './src/config';

const appConfig = loadAppConfig();

export default defineConfig({
  schema: ['./src/db/schema.ts'],
  out: './db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: appConfig.db.url!,
  },
  breakpoints: false,
});
