import { config } from './config.js';

export const WELCOME_CONFIG = {
  WELCOME_CHANNEL_ID: config.welcomeChannelId,
  WELCOME_GIF_PATH: './assets/StarBot.gif',
  LEAVE_CHANNEL_ID: config.leaveChannelId,
  LEAVE_GIF_PATH: './assets/StarBot.gif',
} as const;
