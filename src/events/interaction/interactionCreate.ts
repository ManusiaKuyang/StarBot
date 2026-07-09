import { Events, Interaction, GuildMember, TextChannel } from 'discord.js';
import { ExtendedClient } from '../../types/index.js';
import { logger } from '../../utils/logger.js';
import { SELF_ROLE } from '../../config/selfRole.js';
import { handleSelfRoleButton } from '../../components/selfRole/handler.js';
import { TICKET_CONFIG } from '../../config/ticket.js';
import { ticketService } from '../../services/ticketService.js';
import { permissionService } from '../../services/permissionService.js';
import { handleInteraction } from '../../adminPanel/index.js';

export default {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction, client: ExtendedClient) {
    // 0. Handle Admin Panel Interactions
    if ('customId' in interaction && interaction.customId.startsWith('admin_panel_')) {
      const member = interaction.member as GuildMember;
      if (!member) return;

      if (!permissionService.isStaffOrOwner(member)) {
        await interaction.reply({
          content: "❌ You don't have permission to access the Admin Panel.",
          ephemeral: true,
        });
        return;
      }

      if (interaction.isStringSelectMenu() || interaction.isButton()) {
        try {
          await handleInteraction(interaction, client);
        } catch (error) {
          logger.error('Error running admin panel handler:', error);
        }
      }
      return;
    }

    // 1. Handle Slash Commands
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) {
        logger.warning(
          `Command '${interaction.commandName}' executed but not found in collection.`,
        );
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        logger.error(`Error running command: ${interaction.commandName}`, error);

        const responsePayload = {
          content: 'An error occurred while executing this command.',
          ephemeral: true,
        };

        if (interaction.replied || interaction.deferred) {
          await interaction
            .followUp(responsePayload)
            .catch((e) => logger.error('Error sending error followUp:', e));
        } else {
          await interaction
            .reply(responsePayload)
            .catch((e) => logger.error('Error sending error reply:', e));
        }
      }
    }

    // 2. Handle Button Interactions
    else if (interaction.isButton()) {
      const member = interaction.member as GuildMember;
      const guild = interaction.guild;
      const channel = interaction.channel as TextChannel;

      if (!guild || !member || !channel) {
        return;
      }

      // Self Role button routing
      if (
        interaction.customId === SELF_ROLE.BUTTON_ID ||
        interaction.customId === SELF_ROLE.FEMALE_BUTTON_ID ||
        interaction.customId === SELF_ROLE.MALE_BUTTON_ID
      ) {
        try {
          await handleSelfRoleButton(interaction);
        } catch (error) {
          logger.error('Error executing self role button handler:', error);
        }
        return;
      }

      // Apply for Guild button routing
      if (interaction.customId === TICKET_CONFIG.BUTTON_ID) {
        try {
          await ticketService.createTicket(guild, member, interaction);
        } catch (error) {
          logger.error('Error executing guild apply ticket creation:', error);
        }
        return;
      }

      // Accept Application button routing
      if (interaction.customId === TICKET_CONFIG.ACCEPT_ID) {
        try {
          if (!permissionService.isStaffOrOwner(member)) {
            await interaction.reply({
              content: "❌ You don't have permission to use this action.",
              ephemeral: true,
            });
            return;
          }
          await interaction.deferUpdate();
          await ticketService.handleAccept(channel, interaction.user);
        } catch (error) {
          logger.error('Error executing accept ticket handler:', error);
        }
        return;
      }

      // Reject Application button routing
      if (interaction.customId === TICKET_CONFIG.REJECT_ID) {
        try {
          if (!permissionService.isStaffOrOwner(member)) {
            await interaction.reply({
              content: "❌ You don't have permission to use this action.",
              ephemeral: true,
            });
            return;
          }
          await interaction.deferUpdate();
          await ticketService.handleReject(channel, interaction.user);
        } catch (error) {
          logger.error('Error executing reject ticket handler:', error);
        }
        return;
      }

      // Cancel Ticket button routing
      if (interaction.customId === TICKET_CONFIG.CANCEL_ID) {
        try {
          const canCancel = await permissionService.canCancel(member, channel);

          if (!canCancel) {
            await interaction.reply({
              content: "❌ You don't have permission to use this action.",
              ephemeral: true,
            });
            return;
          }
          await interaction.deferUpdate();
          await ticketService.handleCancel(channel, interaction.user);
        } catch (error) {
          logger.error('Error executing cancel ticket handler:', error);
        }
        return;
      }

      const handler = client.buttons.get(interaction.customId);
      if (handler) {
        try {
          await handler.execute(interaction);
        } catch (error) {
          logger.error(`Error running button handler: ${interaction.customId}`, error);
        }
      } else {
        logger.info(`Button clicked: ${interaction.customId} (No handler registered)`);
      }
    }

    // 3. Handle Select Menu Interactions
    else if (interaction.isAnySelectMenu()) {
      const handler = client.selectMenus.get(interaction.customId);
      if (handler) {
        try {
          await handler.execute(interaction);
        } catch (error) {
          logger.error(`Error running select menu handler: ${interaction.customId}`, error);
        }
      } else {
        logger.info(`Select menu changed: ${interaction.customId} (No handler registered)`);
      }
    }

    // 4. Handle Modal Submit Interactions
    else if (interaction.isModalSubmit()) {
      const handler = client.modals.get(interaction.customId);
      if (handler) {
        try {
          await handler.execute(interaction);
        } catch (error) {
          logger.error(`Error running modal handler: ${interaction.customId}`, error);
        }
      } else {
        logger.info(`Modal submitted: ${interaction.customId} (No handler registered)`);
      }
    }
  },
};
