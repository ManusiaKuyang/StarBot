import { EmbedBuilder, GuildMember } from 'discord.js';

/**
 * Generates the premium Leave Embed configuration for departing members.
 */
export function createLeaveEmbed(member: GuildMember): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle(`<a:lovekey:1522685104231813343> Farewell, ${member.user.username}`)
    .setDescription(
      `Thank you for having been a part of **Star Syndrome**. We appreciate the moments you shared with us and wish you the absolute best on your journey ahead.`,
    )
    .setColor('#EF4444')
    .setImage('attachment://StarBot.gif')
    .setTimestamp()
    .setFooter({ text: 'Star Syndrome' });
}
