import { EmbedBuilder } from 'discord.js';

/**
 * Creates the DM Embed sent to the applicant when their application is accepted.
 */
export function createAcceptDmEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle('🎉 Congratulations!')
    .setDescription(
      'Your Guild Application has been accepted!\n\n' +
        'Welcome to **Star Syndrome**.\n\n' +
        "We're excited to have you become part of our community.\n\n" +
        'If any additional information is required, our staff will contact you shortly.\n\n' +
        'Happy Growing! 🌱',
    )
    .setColor('#22C55E')
    .setFooter({ text: 'Star Syndrome' })
    .setTimestamp();
}

/**
 * Creates the DM Embed sent to the applicant when their application is rejected.
 */
export function createRejectDmEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle('🌱 Happy Growing!')
    .setDescription(
      'Hello!\n\n' +
        'Thank you for taking the time to apply for **Star Syndrome**.\n\n' +
        "After carefully reviewing your application, we've decided not to move forward with it at this time.\n\n" +
        'We sincerely appreciate your interest and encourage you to apply again in the future.\n\n' +
        'We wish you all the best and hope to see you again.\n\n' +
        '🌱 Happy Growing!',
    )
    .setColor('#EF4444')
    .setFooter({ text: 'Star Syndrome' })
    .setTimestamp();
}

/**
 * Creates the DM Embed sent to the applicant when their application is cancelled.
 */
export function createCancelDmEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle('🗑️ Application Cancelled')
    .setDescription(
      'Your Guild Application has been cancelled.\n\n' +
        "If you change your mind, you're always welcome to submit a new application.\n\n" +
        'Thank you for your interest in Star Syndrome.',
    )
    .setColor('#6B7280')
    .setFooter({ text: 'Star Syndrome' })
    .setTimestamp();
}
