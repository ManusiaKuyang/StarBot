import { TextChannel, GuildMember } from 'discord.js';
import { TICKET_CONFIG } from '../config/ticket.js';
import { logger } from '../utils/logger.js';

export const notificationService = {
  /**
   * Sends a ping alert for the staff in the ticket channel, deleting it after 5 seconds.
   */
  async sendStaffNotification(channel: TextChannel, member: GuildMember): Promise<void> {
    const ownerPing = TICKET_CONFIG.OWNER_ROLE_ID ? `<@&${TICKET_CONFIG.OWNER_ROLE_ID}>` : '';
    const staffPing = TICKET_CONFIG.STAFF_ROLE_ID ? `<@&${TICKET_CONFIG.STAFF_ROLE_ID}>` : '';
    const timestampSec = Math.floor(Date.now() / 1000);

    const content =
      `${ownerPing} ${staffPing}\n\n` +
      '━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      '📩 New Guild Application\n\n' +
      'Applicant:\n' +
      `${member}\n\n` +
      'Ticket:\n' +
      `${channel}\n\n` +
      'Created:\n' +
      `<t:${timestampSec}:F>\n\n` +
      '━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      'Please review this application when available.';

    const rolesToMention: string[] = [];
    if (TICKET_CONFIG.OWNER_ROLE_ID && TICKET_CONFIG.OWNER_ROLE_ID.trim() !== '') {
      rolesToMention.push(TICKET_CONFIG.OWNER_ROLE_ID);
    }
    if (TICKET_CONFIG.STAFF_ROLE_ID && TICKET_CONFIG.STAFF_ROLE_ID.trim() !== '') {
      rolesToMention.push(TICKET_CONFIG.STAFF_ROLE_ID);
    }

    try {
      const sentMessage = await channel.send({
        content,
        allowedMentions: {
          roles: rolesToMention,
        },
      });

      // Automatically delete the notification ping message after 5 seconds
      setTimeout(() => {
        sentMessage.delete().catch((err) => {
          logger.warning(`Failed to delete staff notification ping: ${err}`);
        });
      }, 5000);
    } catch (error) {
      logger.error('Failed to send staff notification ping:', error);
    }
  },
};
