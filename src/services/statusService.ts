import { TextChannel, User } from 'discord.js';
import { createStatusEmbed } from '../embeds/statusEmbed.js';
import { logger } from '../utils/logger.js';

export const statusService = {
  /**
   * Scans the channel history, locates the Status Embed message, and edits it to reflect the new state.
   */
  async updateStatus(
    channel: TextChannel,
    status: 'Accepted' | 'Rejected' | 'Cancelled',
    applicant: User | string,
    createdTimestamp: number,
    reviewer: User | string = 'Not Assigned',
  ): Promise<void> {
    try {
      const fetched = await channel.messages.fetch({ limit: 50 });
      const statusMessage = fetched.find(
        (msg) =>
          msg.author.id === channel.client.user?.id &&
          msg.embeds[0]?.title === '📌 Guild Application Status',
      );

      const embed = createStatusEmbed(status, applicant, createdTimestamp, reviewer);

      if (statusMessage) {
        await statusMessage.edit({ embeds: [embed] });
        logger.info(`Status panel updated to '${status}' in channel: ${channel.name}`);
      } else {
        logger.warning(
          `Could not find Guild Application Status embed to update in channel: ${channel.name}`,
        );
      }
    } catch (error) {
      logger.error('Failed to update status embed:', error);
    }
  },
};
