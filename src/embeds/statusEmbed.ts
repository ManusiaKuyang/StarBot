import { EmbedBuilder, User, ColorResolvable } from 'discord.js';

/**
 * Creates the real-time Status Embed message sent inside the ticket channel.
 */
export function createStatusEmbed(
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Cancelled',
  applicant: User | string,
  createdTimestamp: number,
  reviewer: User | string = 'Not Assigned',
): EmbedBuilder {
  let statusText = '';
  let color: ColorResolvable = '#FBBF24';

  if (status === 'Pending') {
    statusText = '🟡 Pending Review';
    color = '#FBBF24';
  } else if (status === 'Accepted') {
    statusText = '🟢 Accepted';
    color = '#22C55E';
  } else if (status === 'Rejected') {
    statusText = '🔴 Rejected';
    color = '#EF4444';
  } else {
    statusText = '⚪ Cancelled';
    color = '#6B7280';
  }

  const seconds = Math.floor(createdTimestamp / 1000);
  const timeStr = `<t:${seconds}:F> (<t:${seconds}:R>)`;

  return new EmbedBuilder()
    .setTitle('📌 Guild Application Status')
    .setDescription(
      `**Current Status**\n${statusText}\n\n` +
        `**Applicant**\n${applicant}\n\n` +
        `**Created**\n${timeStr}\n\n` +
        `**Reviewer**\n${reviewer}`,
    )
    .setColor(color)
    .setFooter({ text: 'Star Syndrome' })
    .setTimestamp();
}
