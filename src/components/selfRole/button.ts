import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { SELF_ROLE } from '../../config/selfRole.js';

/**
 * Creates the Button message component row for the Self Role panel.
 */
export function createSelfRoleButton(): ActionRowBuilder<ButtonBuilder> {
  const gagButton = new ButtonBuilder()
    .setCustomId(SELF_ROLE.BUTTON_ID)
    .setLabel('Join Grow a Garden')
    .setStyle(ButtonStyle.Success)
    .setEmoji('1522662779520028822');

  const femaleButton = new ButtonBuilder()
    .setCustomId(SELF_ROLE.FEMALE_BUTTON_ID)
    .setLabel('Female')
    .setStyle(ButtonStyle.Secondary)
    .setEmoji(SELF_ROLE.FEMALE_EMOJI);

  const maleButton = new ButtonBuilder()
    .setCustomId(SELF_ROLE.MALE_BUTTON_ID)
    .setLabel('Male')
    .setStyle(ButtonStyle.Secondary)
    .setEmoji(SELF_ROLE.MALE_EMOJI);

  return new ActionRowBuilder<ButtonBuilder>().addComponents(gagButton, femaleButton, maleButton);
}
