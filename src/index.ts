import { GatewayIntentBits, Partials } from 'discord.js';
import { ExtendedClient } from './types/index.js';
import { config } from './config/config.js';
import { logger } from './utils/logger.js';
import { connectDatabase } from './database/db.js';
import loadEvents from './handlers/eventHandler.js';
import loadCommands from './handlers/commandHandler.js';

// 1. Configure the Discord Client Intents and Partials
const client = new ExtendedClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.User,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.Reaction,
  ],
});

// 2. Global Error Handling
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception occurred:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise);
  logger.error('Reason:', reason);
});

// 3. Application Bootstrap
async function bootstrap() {
  try {
    await connectDatabase();

    logger.info('Registering event handlers...');
    await loadEvents(client);

    logger.info('Registering command handlers...');
    await loadCommands(client);

    logger.info('Logging in to Discord...');
    // Avoid attempting login with the exact placeholder token to prevent throwing runtime error during dependency validations
    if (config.discordToken === 'placeholder_token_for_setup') {
      logger.warning(
        'Using placeholder token. Please update the .env file with a valid Discord bot token to connect.',
      );
    } else {
      await client.login(config.discordToken);
    }
  } catch (error) {
    logger.error('Critical failure during bot bootstrap:', error);
    process.exit(1);
  }
}

bootstrap();
