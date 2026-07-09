import { EmbedBuilder } from 'discord.js';

/**
 * Generates the rich Server Guide Embed configuration with interactive channel mentions.
 */
export function createServerGuideEmbed(
  rulesChannelId: string,
  selfRoleChannelId: string,
  recruitmentChannelId: string,
): EmbedBuilder {
  const rulesMention = rulesChannelId ? `<#${rulesChannelId}>` : '**#rules**';
  const selfRoleMention = selfRoleChannelId ? `<#${selfRoleChannelId}>` : '**#self-role**';
  const recruitmentMention = recruitmentChannelId
    ? `<#${recruitmentChannelId}>`
    : '**#guild-recruitment**';

  return new EmbedBuilder()
    .setTitle('📖 Star Syndrome • Server Guide')
    .setDescription(
      'Welcome to **Star Syndrome**! <a:Rainbowstar:1522684445092478986>\n\n' +
        "We're delighted to have you join our community. Whether you're here to enjoy **Grow a Garden 2**, meet new friends, or become part of one of our guilds, this guide will help you get started.\n\n" +
        'Take a moment to explore the information below and enjoy everything Star Syndrome has to offer.\n\n' +
        '━━━━━━━━━━━━━━━━━━━━━━\n\n' +
        '## 🚀 Getting Started\n\n' +
        '📖 **Read the Rules**\n\n' +
        `Please visit ${rulesMention} to familiarize yourself with our community guidelines and help us maintain a friendly environment for everyone.\n\n` +
        '🎭 **Claim Your Roles**\n\n' +
        `Head over to ${selfRoleMention} to unlock additional channels and gain access to Grow a Garden 2 content. <a:meowparty:1522684335818543176>\n\n` +
        '🌿 **Apply for a Guild**\n\n' +
        'Interested in joining one of our guilds?\n' +
        `Visit the ${recruitmentMention} channel and submit your application when recruitment is available. <a:RainbowFrog:1522684649237643285>\n\n` +
        '━━━━━━━━━━━━━━━━━━━━━━\n\n' +
        "## 🌱 What You'll Find\n\n" +
        '🍃 Live Seed Stock Notifications\n\n' +
        '🌙 Moon Predictions\n\n' +
        '🌦️ Weather Updates\n\n' +
        '📢 Community Announcements\n\n' +
        '🎉 Events & Giveaways\n\n' +
        '💬 Friendly Discussions\n\n' +
        'More exciting features will continue to be added as our community grows!\n\n' +
        '━━━━━━━━━━━━━━━━━━━━━━\n\n' +
        '## 💜 Community Values\n\n' +
        'We believe that a great community is built on kindness and respect.\n\n' +
        'Please treat every member with respect, avoid spamming, and help create a welcoming environment for everyone.\n\n' +
        "If you ever need assistance, don't hesitate to reach out to our staff team.\n\n" +
        '━━━━━━━━━━━━━━━━━━━━━━\n\n' +
        '✨ Thank you for being part of **Star Syndrome**.\n\n' +
        'We hope you enjoy your stay and create many wonderful memories with our community.',
    )
    .setColor('#8B5CF6')
    .setFooter({ text: 'Star Syndrome' })
    .setTimestamp();
}
