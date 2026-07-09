import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
  TextChannel,
  Message,
  StringSelectMenuInteraction,
  ButtonInteraction,
  AttachmentBuilder,
} from 'discord.js';
import path from 'path';
import fs from 'fs';
import { ExtendedClient } from '../types/index.js';
import { logger } from '../utils/logger.js';
import { AdminPanelModel } from '../database/models/AdminPanel.js';

import home from './home.js';
import tickets from './tickets.js';
import selfRole from './selfRole.js';
import welcome from './welcome.js';
import guide from './guide.js';
import announcement from './announcement.js';
import statistics from './statistics.js';
import settings from './settings.js';

export const PANEL_CHANNEL_ID = '1522624398090309802';

export const pages = [
  home,
  tickets,
  selfRole,
  welcome,
  guide,
  announcement,
  statistics,
  settings,
];

/**
 * Builds the interaction components (Select Menu and Navigation Buttons) for the panel.
 */
export function buildComponents(activePageId: string) {
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('admin_panel_select')
    .setPlaceholder('Select a menu option...')
    .addOptions(
      pages.map((page) => ({
        label: page.label,
        value: page.id,
        emoji: page.emoji,
        default: page.id === activePageId,
      }))
    );

  const selectRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);

  const refreshButton = new ButtonBuilder()
    .setCustomId(`admin_panel_refresh_${activePageId}`)
    .setLabel('Refresh')
    .setStyle(ButtonStyle.Secondary)
    .setEmoji('🔄');

  const homeButton = new ButtonBuilder()
    .setCustomId('admin_panel_home')
    .setLabel('Home')
    .setStyle(ButtonStyle.Primary)
    .setEmoji('🏠');

  const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(refreshButton, homeButton);

  return [selectRow, buttonRow];
}

/**
 * Deploys the Admin Panel on startup or updates it if it already exists.
 */
export async function deployPanel(client: ExtendedClient): Promise<void> {
  logger.info(`Checking Admin Panel deployment in channel: ${PANEL_CHANNEL_ID}...`);

  try {
    const channel = await client.channels.fetch(PANEL_CHANNEL_ID);
    if (!channel || !(channel instanceof TextChannel)) {
      logger.error(`Admin Panel channel ${PANEL_CHANNEL_ID} was not found or is not a text channel.`);
      return;
    }

    const guild = channel.guild;

    // Check if the panel exists in the database
    let panelConfig = await AdminPanelModel.findOne({ channelId: PANEL_CHANNEL_ID });
    let existingMessage: Message | null = null;

    if (panelConfig) {
      try {
        existingMessage = await channel.messages.fetch(panelConfig.messageId);
      } catch (error) {
        logger.warning(
          `Stored Admin Panel message ID ${panelConfig.messageId} was not found on Discord. Re-deploying...`
        );
        await AdminPanelModel.deleteOne({ _id: panelConfig._id });
        panelConfig = null;
      }
    }

    const embed = await home.render(client);
    const components = buildComponents('home');

    const gifPath = path.resolve('./assets/StarBot.gif');
    const files = fs.existsSync(gifPath) ? [new AttachmentBuilder(gifPath, { name: 'StarBot.gif' })] : [];

    if (existingMessage) {
      logger.info('Existing Admin Panel found. Editing to update it...');
      await existingMessage.edit({
        embeds: [embed],
        components: components,
        files: files,
      });
      logger.success('Admin Panel successfully updated.');
    } else {
      logger.info('No existing Admin Panel found. Sending a new one...');
      const newMessage = await channel.send({
        embeds: [embed],
        components: components,
        files: files,
      });

      await AdminPanelModel.create({
        messageId: newMessage.id,
        channelId: PANEL_CHANNEL_ID,
        guildId: guild.id,
      });
      logger.success('Admin Panel successfully deployed and stored in MongoDB.');
    }
  } catch (error) {
    logger.error('Failed to run startup Admin Panel deployment check:', error);
  }
}

/**
 * Handles select menu and button interactions for the Admin Panel.
 */
export async function handleInteraction(
  interaction: StringSelectMenuInteraction | ButtonInteraction,
  client: ExtendedClient
): Promise<void> {
  try {
    let targetPageId = 'home';

    if (interaction.isStringSelectMenu()) {
      targetPageId = interaction.values[0];
    } else if (interaction.isButton()) {
      if (interaction.customId === 'admin_panel_home') {
        targetPageId = 'home';
      } else if (interaction.customId.startsWith('admin_panel_refresh_')) {
        targetPageId = interaction.customId.replace('admin_panel_refresh_', '');
      }
    }

    const page = pages.find((p) => p.id === targetPageId) || home;
    const embed = await page.render(client);
    const components = buildComponents(page.id);

    await interaction.update({
      embeds: [embed],
      components: components,
    });
  } catch (error) {
    logger.error('Error occurred while handling Admin Panel interaction:', error);
  }
}
export { AdminPanelPage } from './types.js';
