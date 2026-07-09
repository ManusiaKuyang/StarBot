import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { TICKET_CONFIG } from '../../config/ticket.js';

/**
 * Creates the Button action controls row shown inside an active ticket channel.
 */
export function createTicketActionButtons(): ActionRowBuilder<ButtonBuilder> {
  const acceptButton = new ButtonBuilder()
    .setCustomId(TICKET_CONFIG.ACCEPT_ID)
    .setLabel('Accept Application')
    .setStyle(ButtonStyle.Success)
    .setEmoji('✅');

  const rejectButton = new ButtonBuilder()
    .setCustomId(TICKET_CONFIG.REJECT_ID)
    .setLabel('Reject Application')
    .setStyle(ButtonStyle.Danger)
    .setEmoji('❌');

  const cancelButton = new ButtonBuilder()
    .setCustomId(TICKET_CONFIG.CANCEL_ID)
    .setLabel('Cancel Ticket')
    .setStyle(ButtonStyle.Secondary)
    .setEmoji('🗑');

  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    acceptButton,
    rejectButton,
    cancelButton,
  );
}
