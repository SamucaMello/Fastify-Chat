import { defineConfig } from 'drizzle-kit';
import {DATABASE_URL} from "./src/config/config.js"

export default defineConfig({
  schema: './src/database/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL,
  },
});