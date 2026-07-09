import {
  Guild,
  GuildMember,
  TextChannel,
  ChannelType,
  PermissionFlagsBits,
  ButtonInteraction,
  AttachmentBuilder,
  User,
} from 'discord.js';
import { TICKET_CONFIG } from '../config/ticket.js';
import { createTicketWelcomeEmbed } from '../embeds/welcomeEmbed.js';
import { createStatusEmbed } from '../embeds/statusEmbed.js';
import { createTicketActionButtons } from '../components/ticket/actionButtons.js';
import { permissionService } from './permissionService.js';
import { transcriptService } from './transcriptService.js';
import { notificationService } from './notificationService.js';
import { statusService } from './statusService.js';
import { countdownService } from './countdownService.js';
import { createTicketLogEmbed } from '../embeds/logEmbed.js';
import {
  createAcceptDmEmbed,
  createRejectDmEmbed,
  createCancelDmEmbed,
} from '../embeds/dmEmbeds.js';
import { logger } from '../utils/logger.js';

export const ticketService = {
  /**
   * Creates a private ticket channel for the applicant and schedules alerts.
   */
  async createTicket(
    guild: Guild,
    member: GuildMember,
    interaction: ButtonInteraction,
  ): Promise<void> {
    const username = member.user.username.toLowerCase().replace(/[^a-z0-9-]/g, '');
    const channelName = `apply-${username}`;

    // 1. Check if user already has an active ticket channel
    const existingChannel = guild.channels.cache.find(
      (c) => c.name === channelName && c.type === ChannelType.GuildText,
    );

    if (existingChannel) {
      await interaction.reply({
        content:
          '❌ You already have an active Guild Application.\n\nPlease finish your current application before creating another one.',
        ephemeral: true,
      });
      return;
    }

    try {
      // 2. Resolve parent category
      let parentId: string | undefined = undefined;
      const categoryId = TICKET_CONFIG.TICKET_CATEGORY_ID;
      if (categoryId && categoryId.trim() !== '') {
        const category = guild.channels.cache.get(categoryId);
        if (category && category.type === ChannelType.GuildCategory) {
          parentId = categoryId;
        }
      }

      // 3. Assemble permission overrides
      const permissionOverwrites = [
        {
          id: guild.roles.everyone.id,
          deny: [PermissionFlagsBits.ViewChannel],
        },
        {
          id: member.id,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
          ],
        },
        {
          id: guild.client.user!.id,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
            PermissionFlagsBits.ManageChannels,
            PermissionFlagsBits.AttachFiles,
          ],
        },
      ];

      const ownerRoleId = TICKET_CONFIG.OWNER_ROLE_ID;
      if (ownerRoleId && ownerRoleId.trim() !== '') {
        permissionOverwrites.push({
          id: ownerRoleId,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
            PermissionFlagsBits.ManageMessages,
          ],
        });
      }

      const staffRoleId = TICKET_CONFIG.STAFF_ROLE_ID;
      if (staffRoleId && staffRoleId.trim() !== '') {
        permissionOverwrites.push({
          id: staffRoleId,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
            PermissionFlagsBits.ManageMessages,
          ],
        });
      }

      // 4. Create the channel
      const channel = await guild.channels.create({
        name: channelName,
        type: ChannelType.GuildText,
        parent: parentId,
        permissionOverwrites,
      });

      // 5. Send notification pings first (deleted after 5s)
      await notificationService.sendStaffNotification(channel, member);

      // 6. Send welcome embed
      const welcomeEmbed = createTicketWelcomeEmbed(member);
      await channel.send({ embeds: [welcomeEmbed] });

      // 7. Send status embed & action buttons panel
      const statusEmbed = createStatusEmbed('Pending', member.user, channel.createdTimestamp);
      const actionButtons = createTicketActionButtons();
      await channel.send({ embeds: [statusEmbed], components: [actionButtons] });

      // 8. Confirm ticket creation
      await interaction.reply({
        content: `Guild application ticket created: ${channel}`,
        ephemeral: true,
      });

      logger.info(`Ticket channel '${channelName}' created for user: ${member.user.tag}`);
    } catch (error) {
      logger.error('Failed to create ticket channel:', error);
      await interaction.reply({
        content: '❌ An error occurred while creating your ticket channel. Please try again later.',
        ephemeral: true,
      });
    }
  },

  /**
   * Processes the Accept action for a ticket.
   */
  async handleAccept(channel: TextChannel, staffUser: User): Promise<void> {
    const applicant = await permissionService.getApplicant(channel);

    // 1. Update status embed in channel
    await statusService.updateStatus(
      channel,
      'Accepted',
      applicant || 'Unknown Applicant',
      channel.createdTimestamp,
      staffUser,
    );

    // 2. Send Direct Message to applicant
    if (applicant) {
      const dmEmbed = createAcceptDmEmbed();
      await applicant.send({ embeds: [dmEmbed] }).catch(() => {
        logger.warning(`Could not send Accept DM to applicant: ${applicant.tag} (DMs closed)`);
      });
    }

    // 3. Generate and log PDF Transcript & Log embed
    await this.logTicketAction(channel, 'Accepted', applicant || staffUser, staffUser);

    // 4. Start countdown and delete channel
    await countdownService.startCountdown(channel, 10, async () => {
      await channel
        .delete()
        .catch((err) => logger.error('Failed to delete accepted ticket channel:', err));
    });
  },

  /**
   * Processes the Reject action for a ticket.
   */
  async handleReject(channel: TextChannel, staffUser: User): Promise<void> {
    const applicant = await permissionService.getApplicant(channel);

    // 1. Update status embed in channel
    await statusService.updateStatus(
      channel,
      'Rejected',
      applicant || 'Unknown Applicant',
      channel.createdTimestamp,
      staffUser,
    );

    // 2. Send Direct Message to applicant
    if (applicant) {
      const dmEmbed = createRejectDmEmbed();
      await applicant.send({ embeds: [dmEmbed] }).catch(() => {
        logger.warning(`Could not send Reject DM to applicant: ${applicant.tag} (DMs closed)`);
      });
    }

    // 3. Generate and log PDF Transcript & Log embed
    await this.logTicketAction(channel, 'Rejected', applicant || staffUser, staffUser);

    // 4. Start countdown and delete channel
    await countdownService.startCountdown(channel, 10, async () => {
      await channel
        .delete()
        .catch((err) => logger.error('Failed to delete rejected ticket channel:', err));
    });
  },

  /**
   * Processes the Cancel action for a ticket.
   */
  async handleCancel(channel: TextChannel, staffUser: User): Promise<void> {
    const applicant = await permissionService.getApplicant(channel);

    // 1. Update status embed in channel
    await statusService.updateStatus(
      channel,
      'Cancelled',
      applicant || 'Unknown Applicant',
      channel.createdTimestamp,
      staffUser,
    );

    // 2. Send Direct Message to applicant
    if (applicant) {
      const dmEmbed = createCancelDmEmbed();
      await applicant.send({ embeds: [dmEmbed] }).catch(() => {
        logger.warning(`Could not send Cancel DM to applicant: ${applicant.tag} (DMs closed)`);
      });
    }

    // 3. Generate and log PDF Transcript & Log embed
    await this.logTicketAction(channel, 'Cancelled', applicant || staffUser, staffUser);

    // 4. Start countdown and delete channel
    await countdownService.startCountdown(channel, 10, async () => {
      await channel
        .delete()
        .catch((err) => logger.error('Failed to delete cancelled ticket channel:', err));
    });
  },

  /**
   * Helper function to log actions, build transcripts, and upload files.
   */
  async logTicketAction(
    channel: TextChannel,
    status: 'Accepted' | 'Rejected' | 'Cancelled',
    applicant: User,
    staff: User,
  ): Promise<void> {
    try {
      // 1. Fetch channel messages
      const fetched = await channel.messages.fetch({ limit: 100 });
      const messages = Array.from(fetched.values());

      // 2. Generate PDF transcript buffer
      const transcriptBuffer = await transcriptService.generatePdfTranscript(
        channel.name,
        messages,
        applicant.tag,
        staff.tag,
        status,
        channel.createdTimestamp,
      );

      const username = channel.name.replace('apply-', '');
      const attachment = new AttachmentBuilder(transcriptBuffer, {
        name: `Guild-Transcript-${username}.pdf`,
      });

      // 3. Compile log embed
      const logEmbed = createTicketLogEmbed(
        status,
        applicant,
        staff,
        channel.name,
        channel.createdTimestamp,
      );

      // 4. Dispatch to log channel
      const logChannelId = TICKET_CONFIG.LOG_CHANNEL_ID;
      const logChannel = channel.guild.channels.cache.get(logChannelId);

      if (logChannel && logChannel instanceof TextChannel) {
        await logChannel.send({ embeds: [logEmbed], files: [attachment] });
      } else {
        logger.warning(
          `Ticket log channel with ID '${logChannelId}' not found or is not a text channel.`,
        );
      }
    } catch (error) {
      logger.error('Failed to generate log/transcript for ticket channel:', error);
    }
  },
};
