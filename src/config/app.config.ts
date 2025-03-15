import { registerAs } from '@nestjs/config';

export interface AppConfig {
  messagePrefix: string;
  messageSuffix: string;
}

export const appConfig = registerAs(
  'app',
  (): AppConfig => ({
    messagePrefix: process.env.APP_MESSAGE_PREFIX || 'Hello world!',
    messageSuffix: process.env.APP_MESSAGE_SUFFIX || 'Dummy Services Return',
  }),
);
