import { Events, TextChannel } from 'discord.js';
import { ExtendedClient } from '../../types/index.js';
import { logger } from '../../utils/logger.js';
import { SELF_ROLE } from '../../config/selfRole.js';
import { createSelfRoleEmbed } from '../../components/selfRole/embed.js';
import { createSelfRoleButton } from '../../components/selfRole/button.js';
import { TICKET_CONFIG } from '../../config/ticket.js';
import { getGuildRecruitmentPanel } from '../../components/ticket/panel.js';
import { serverGuideService } from '../../services/serverGuideService.js';
import { deployPanel } from '../../adminPanel/index.js';

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client: ExtendedClient) {
    logger.success(`Logged in as ${client.user?.tag}! Bot is ready.`);

    // 1. Check and deploy Self Role Panel
    await deploySelfRolePanel(client);

    // 2. Check and deploy Guild Recruitment Panel
    await deployGuildRecruitmentPanel(client);

    // 3. Check and deploy Server Guide Panel
    await serverGuideService.deployPanel(client);

    // 4. Check and deploy Admin Panel
    await deployPanel(client);
  },
};

/**
 * Checks if Self Role panel is in target channel; posts it if missing, edits if existing.
 */
async function deploySelfRolePanel(client: ExtendedClient) {
  const channelId = SELF_ROLE.CHANNEL_ID;
  if (!channelId || channelId.trim() === '') {
    logger.warning('SELF_ROLE.CHANNEL_ID is not configured. Auto-panel deployment skipped.');
    return;
  }

  try {
    logger.info(`Fetching self-role channel with ID: ${channelId}...`);
    const channel = await client.channels.fetch(channelId);

    if (!channel || !(channel instanceof TextChannel)) {
      logger.error('Target self-role channel was not found or is not a text channel.');
      return;
    }

    logger.info('Scanning self-role channel history for existing panel message...');
    const fetchedMessages = await channel.messages.fetch({ limit: 50 });
    const existingPanel = fetchedMessages.find(
      (msg) => msg.author.id === client.user?.id && msg.embeds[0]?.title === '⭐ Star Syndrome',
    );

    const embed = createSelfRoleEmbed();
    const button = createSelfRoleButton();

    if (existingPanel) {
      logger.info('Existing Self Role panel found on channel. Editing to update it...');
      await existingPanel.edit({
        embeds: [embed],
        components: [button],
      });
      logger.success('Self Role panel successfully updated.');
    } else {
      logger.info('No existing panel found. Sending a new Self Role panel...');
      await channel.send({
        embeds: [embed],
        components: [button],
      });
      logger.success('Self Role panel successfully deployed.');
    }
  } catch (error) {
    logger.error('Failed to run startup self-role panel auto-deployment check:', error);
  }
}

/**
 * Checks if Guild Recruitment panel is in target channel; posts it if missing, edits if existing.
 */
async function deployGuildRecruitmentPanel(client: ExtendedClient) {
  const channelId = TICKET_CONFIG.PANEL_CHANNEL_ID;
  if (!channelId || channelId.trim() === '') {
    logger.warning(
      'TICKET_CONFIG.PANEL_CHANNEL_ID is not configured. Auto-recruitment panel deployment skipped.',
    );
    return;
  }

  try {
    logger.info(`Fetching guild recruitment channel with ID: ${channelId}...`);
    const channel = await client.channels.fetch(channelId);

    if (!channel || !(channel instanceof TextChannel)) {
      logger.error('Target guild recruitment channel was not found or is not a text channel.');
      return;
    }

    logger.info('Scanning recruitment channel history for existing panel message...');
    const fetchedMessages = await channel.messages.fetch({ limit: 50 });
    const existingPanel = fetchedMessages.find(
      (msg) =>
        msg.author.id === client.user?.id &&
        msg.embeds[0]?.title &&
        msg.embeds[0].title.includes('Star Syndrome • Guild Recruitment'),
    );

    const panelData = getGuildRecruitmentPanel();

    if (existingPanel) {
      logger.info('Existing Guild Recruitment panel found on channel. Editing to update it...');
      await existingPanel.edit(panelData);
      logger.success('Guild Recruitment panel successfully updated.');
    } else {
      logger.info('No existing panel found. Sending a new Guild Recruitment panel...');
      await channel.send(panelData);
      logger.success('Guild Recruitment panel successfully deployed.');
    }
  } catch (error) {
    logger.error('Failed to run startup guild recruitment panel auto-deployment check:', error);
  }
}
