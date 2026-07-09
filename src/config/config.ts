import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env relative to the src directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const requiredEnvVars = ['DISCORD_TOKEN', 'CLIENT_ID', 'GUILD_ID', 'DATABASE_URL'] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar] || process.env[envVar].trim() === '') {
    // If it is just placeholder_token_for_setup, we allow it for build/dev validation without throwing error on start if they run with placeholder
    if (process.env[envVar] === 'placeholder_token_for_setup') {
      continue;
    }
    throw new Error(`[CONFIG ERROR] Missing required environment variable: ${envVar}`);
  }
}

export const config = {
  discordToken: process.env.DISCORD_TOKEN as string,
  clientId: process.env.CLIENT_ID as string,
  guildId: process.env.GUILD_ID as string,
  databaseUrl: process.env.DATABASE_URL as string,
  panelChannelId: process.env.PANEL_CHANNEL_ID || '',
  welcomeChannelId: process.env.WELCOME_CHANNEL_ID || '',
  leaveChannelId: process.env.LEAVE_CHANNEL_ID || '',
} as const;
