import { EmbedBuilder, GuildMember } from 'discord.js';

/**
 * Generates the premium Welcome Embed configuration for new members joining the server.
 */
export function createWelcomeEmbed(member: GuildMember): EmbedBuilder {
  const memberCount = member.guild.memberCount;

  return new EmbedBuilder()
    .setTitle('<a:Rainbowstar:1522684445092478986>  Welcome to Star Syndrome')
    .setDescription(
      `We are thrilled to have you join our community, ${member}! <a:meowparty:1522684335818543176>\n\n` +
        `**Unlock Your Journey**\n` +
        `To access the dedicated **Grow a Garden 2** channels, please head over to our self-role channel and claim your **Grow a Garden** role. Once selected, you will unlock full access to:\n\n` +
        `🌱 **Seed Stock Notifications** (Real-time live updates)\n` +
        `🌦️ **Weather Updates** (Keep track of changing forecasts)\n` +
        `🌙 **Moon Predictions** (Plan your harvests perfectly)\n` +
        `📈 **Event & Community Info** (Connect and exchange info with others)\n\n` +
        `Take your time to look around, read the rules, and say hello!`,
    )
    .addFields({
      name: ' ',
      value: `<a:RainbowFrog:1522684649237643285> You are our **${memberCount}**th member!`,
    })
    .setColor('#8B5CF6')
    .setImage('attachment://StarBot.gif')
    .setTimestamp()
    .setFooter({ text: 'Star Syndrome' });
}

/**
 * Creates the welcome Embed message sent inside the created ticket channel.
 */
export function createTicketWelcomeEmbed(member: GuildMember): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle('🌿 Welcome to Your Guild Application')
    .setDescription(
      `Welcome, ${member}! 👋\n\n` +
        'Thank you for your interest in joining **Star Syndrome**.\n\n' +
        'Your Guild Application has been successfully created.\n\n' +
        'A member of our recruitment team will assist you as soon as possible and guide you through the next steps of the application process.\n\n' +
        'Please be patient while waiting for a recruiter to respond, and simply follow any instructions provided inside this ticket.\n\n' +
        'We truly appreciate your interest in becoming part of our community and wish you the very best of luck.\n\n' +
        '✨ We hope to welcome you into **Star Syndrome** soon!',
    )
    .setColor('#8B5CF6')
    .setFooter({ text: 'Star Syndrome' })
    .setTimestamp();
}
