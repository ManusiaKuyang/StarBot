import { ExtendedClient } from '../types/index.js';
import { TextChannel } from 'discord.js';
import { SERVER_GUIDE } from '../config/serverGuide.js';
import { SELF_ROLE } from '../config/selfRole.js';
import { TICKET_CONFIG } from '../config/ticket.js';
import { createServerGuideEmbed } from '../embeds/serverGuideEmbed.js';
import { logger } from '../utils/logger.js';

export const serverGuideService = {
  /**
   * Deploys or updates the permanent Server Guide embed inside the target channel.
   */
  async deployPanel(client: ExtendedClient): Promise<void> {
    const channelId = SERVER_GUIDE.CHANNEL_ID;
    if (!channelId || channelId.trim() === '') {
      logger.warning('SERVER_GUIDE.CHANNEL_ID is not configured. Auto-panel deployment skipped.');
      return;
    }

    try {
      logger.info(`Fetching server guide channel with ID: ${channelId}...`);
      const channel = await client.channels.fetch(channelId);

      if (!channel || !(channel instanceof TextChannel)) {
        logger.error('Target server guide channel was not found or is not a text channel.');
        return;
      }

      const guild = channel.guild;

      // 1. Look up rules channel dynamically
      const rulesChannel = guild.channels.cache.find(
        (c) => c.name.toLowerCase().includes('rules') && c.isTextBased(),
      );
      const rulesChannelId = rulesChannel ? rulesChannel.id : guild.rulesChannelId || '';

      // 2. Fetch configured channel IDs
      const selfRoleChannelId = SELF_ROLE.CHANNEL_ID;
      const recruitmentChannelId = TICKET_CONFIG.PANEL_CHANNEL_ID;

      logger.info('Scanning server guide channel history for existing panel message...');
      const fetchedMessages = await channel.messages.fetch({ limit: 50 });
      const existingPanel = fetchedMessages.find(
        (msg) =>
          msg.author.id === client.user?.id &&
          msg.embeds[0]?.title === '📖 Star Syndrome • Server Guide',
      );

      const embed = createServerGuideEmbed(rulesChannelId, selfRoleChannelId, recruitmentChannelId);

      if (existingPanel) {
        logger.info('Existing Server Guide panel found on channel. Editing to update it...');
        await existingPanel.edit({
          embeds: [embed],
        });
        logger.success('Server Guide panel successfully updated.');
      } else {
        logger.info('No existing panel found. Sending a new Server Guide panel...');
        await channel.send({
          embeds: [embed],
        });
        logger.success('Server Guide panel successfully deployed.');
      }
    } catch (error) {
      logger.error('Failed to run startup server guide panel auto-deployment check:', error);
    }
  },
};
