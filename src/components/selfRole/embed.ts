import { EmbedBuilder } from 'discord.js';

/**
 * Creates the rich Embed message configuration for the Self Role panel.
 */
export function createSelfRoleEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle('⭐ Star Syndrome')
    .setDescription(
      '# 🌟 Welcome to Star Syndrome • Self Role\n\n' +
        'Select the roles below to customize your profile and unlock channels:\n\n' +
        '### 🌱 Community Roles\n' +
        '**Grow a Garden**\n' +
        'Unlock exclusive channels dedicated to Grow a Garden 2. Inside you will find:\n' +
        '• 🌾 Live Seed Stock Notifications\n' +
        '• 🌦️ Weather & Event Updates\n' +
        '• 🌙 Moon Predictions\n' +
        '• 📈 Trading & Community Information\n' +
        '• 📢 Important Announcements\n\n' +
        '### 👥 Profile Gender Roles\n' +
        '<:Female:1523534481372217357> **Female**\n' +
        'Assigns the Female profile role indicator to your account.\n\n' +
        '<:Male:1523533738766766082> **Male**\n' +
        'Assigns the Male profile role indicator to your account.\n\n' +
        '---\n' +
        '*Click the corresponding buttons below to toggle these roles on or off at any time.*',
    )
    .setColor('#8B5CF6')
    .setFooter({ text: 'Star Syndrome' });
}
