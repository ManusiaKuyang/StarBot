import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { TICKET_CONFIG } from '../../config/ticket.js';

/**
 * Creates the main Button component row for the Guild Recruitment panel.
 */
export function createGuildRecruitmentButton(): ActionRowBuilder<ButtonBuilder> {
  const button = new ButtonBuilder()
    .setCustomId(TICKET_CONFIG.BUTTON_ID)
    .setLabel('Apply for Guild')
    .setStyle(ButtonStyle.Success)
    .setEmoji('🌱');

  return new ActionRowBuilder<ButtonBuilder>().addComponents(button);
}
