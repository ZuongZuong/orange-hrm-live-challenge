import { FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

async function globalSetup(config: FullConfig) {
  const env = process.env.TEST_ENV || 'test';
  const envPath = path.resolve(process.cwd(), `env/.env.${env}`);
  dotenv.config({ path: envPath, override: true });
}

export default globalSetup;