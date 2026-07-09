import { EmbedBuilder } from 'discord.js';

/**
 * Generates the premium Guild Recruitment Embed configuration.
 */
export function createGuildRecruitmentEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle('<a:Rainbowstar:1522684445092478986>  Star Syndrome • Guild Recruitment')
    .setDescription(
      'Thank you for your interest in joining **Star Syndrome**!\n\n' +
        "If you're ready to become part of our guild, click the button below to open your application ticket. <a:RainbowFrog:1522684649237643285>\n\n" +
        'Our recruitment team will guide you through the application process and review your application as soon as possible.\n\n' +
        'Please be patient while waiting for a response, and make sure to follow the instructions provided inside your ticket.\n\n' +
        '✨ We wish you the best of luck and hope to welcome you to **Star Syndrome** soon! <a:meowparty:1522684335818543176>',
    )
    .setColor('#8B5CF6')
    .setFooter({ text: 'Star Syndrome' });
}
