import { EmbedBuilder, User, ColorResolvable } from 'discord.js';

/**
 * Creates the log Embed message sent to the log channel.
 */
export function createTicketLogEmbed(
  status: 'Accepted' | 'Rejected' | 'Cancelled',
  applicant: User,
  staff: User,
  channelName: string,
  createdTimestamp: number,
): EmbedBuilder {
  let title = '';
  let color: ColorResolvable = '#6B7280';

  if (status === 'Accepted') {
    title = '✅ Guild Application Accepted';
    color = '#10B981';
  } else if (status === 'Rejected') {
    title = '❌ Guild Application Rejected';
    color = '#EF4444';
  } else {
    title = '🗑️ Guild Application Cancelled';
    color = '#6B7280';
  }

  const seconds = Math.floor(createdTimestamp / 1000);
  const timeStr = `<t:${seconds}:F> (<t:${seconds}:R>)`;

  return new EmbedBuilder()
    .setTitle(title)
    .setColor(color)
    .addFields(
      { name: 'Applicant', value: `${applicant} (${applicant.tag})`, inline: true },
      { name: 'Handled By', value: `${staff} (${staff.tag})`, inline: true },
      { name: 'Ticket', value: `#${channelName}`, inline: true },
      { name: 'Created', value: timeStr, inline: true },
      { name: 'Status', value: `**${status}**`, inline: true },
    )
    .setFooter({ text: 'Star Syndrome' })
    .setTimestamp();
}
