import { GuildMember, TextChannel, AttachmentBuilder } from 'discord.js';
import { WELCOME_CONFIG } from '../config/welcome.js';
import { createWelcomeEmbed } from '../embeds/welcomeEmbed.js';
import { createLeaveEmbed } from '../embeds/leaveEmbed.js';
import { logger } from '../utils/logger.js';
import fs from 'fs';
import path from 'path';

export const welcomeService = {
  /**
   * Dispatches the premium welcome embed and GIF attachment to the configured channel.
   */
  async sendWelcome(member: GuildMember): Promise<void> {
    const channelId = WELCOME_CONFIG.WELCOME_CHANNEL_ID;
    if (!channelId || channelId.trim() === '') {
      logger.warning('Welcome channel ID is not configured. Welcome message skipped.');
      return;
    }

    try {
      const channel = await member.guild.channels.fetch(channelId);
      if (!channel || !(channel instanceof TextChannel)) {
        logger.error(
          `Welcome channel with ID '${channelId}' was not found or is not a text channel.`,
        );
        return;
      }

      const gifPath = path.resolve(WELCOME_CONFIG.WELCOME_GIF_PATH);
      if (!fs.existsSync(gifPath)) {
        logger.error(`Welcome GIF file was not found at path: ${gifPath}`);
        return;
      }

      const attachment = new AttachmentBuilder(gifPath, { name: 'StarBot.gif' });
      const embed = createWelcomeEmbed(member);

      await channel.send({
        content: `Welcome to Star Syndrome, ${member}!`,
        embeds: [embed],
        files: [attachment],
      });

      logger.info(`Welcome message dispatched successfully for user: ${member.user.tag}`);
    } catch (error) {
      logger.error(`Failed to dispatch welcome message for user ${member.user.tag}:`, error);
    }
  },

  /**
   * Dispatches the premium leave embed and GIF attachment to the configured channel.
   */
  async sendLeave(member: GuildMember): Promise<void> {
    const channelId = WELCOME_CONFIG.LEAVE_CHANNEL_ID;
    if (!channelId || channelId.trim() === '') {
      logger.warning('Leave channel ID is not configured. Leave message skipped.');
      return;
    }

    try {
      const channel = await member.guild.channels.fetch(channelId);
      if (!channel || !(channel instanceof TextChannel)) {
        logger.error(
          `Leave channel with ID '${channelId}' was not found or is not a text channel.`,
        );
        return;
      }

      const gifPath = path.resolve(WELCOME_CONFIG.LEAVE_GIF_PATH);
      if (!fs.existsSync(gifPath)) {
        logger.error(`Leave GIF file was not found at path: ${gifPath}`);
        return;
      }

      const attachment = new AttachmentBuilder(gifPath, { name: 'StarBot.gif' });
      const embed = createLeaveEmbed(member);

      await channel.send({
        embeds: [embed],
        files: [attachment],
      });

      logger.info(`Leave message dispatched successfully for user: ${member.user.tag}`);
    } catch (error) {
      logger.error(`Failed to dispatch leave message for user ${member.user.tag}:`, error);
    }
  },
};
