import { TextChannel } from 'discord.js';
import { logger } from '../utils/logger.js';

export const countdownService = {
  /**
   * Dispatches a warning message and edits it every second to show the remaining seconds,
   * then calls the callback function once the countdown reaches zero.
   */
  async startCountdown(
    channel: TextChannel,
    totalSeconds: number = 10,
    callback: () => Promise<void>,
  ): Promise<void> {
    try {
      const msg = await channel.send({
        content: `🔒 This ticket has been completed.\n\nThis channel will be deleted in **${totalSeconds} seconds**.`,
      });

      let current = totalSeconds;
      const timer = setInterval(async () => {
        current--;
        if (current <= 0) {
          clearInterval(timer);
          await callback().catch(() => {});
          return;
        }

        await msg
          .edit({
            content: `🔒 This ticket has been completed.\n\nThis channel will be deleted in **${current} seconds**.`,
          })
          .catch(() => {
            // Stop if the message or channel is deleted/inaccessible
            clearInterval(timer);
          });
      }, 1000);
    } catch (error) {
      logger.error('Failed to run deletion countdown:', error);
      // Run the callback directly if the bot cannot send messages
      await callback().catch(() => {});
    }
  },
};
