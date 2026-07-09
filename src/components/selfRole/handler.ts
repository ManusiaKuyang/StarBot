import { ButtonInteraction, GuildMember } from 'discord.js';
import { SELF_ROLE } from '../../config/selfRole.js';
import { roleService } from '../../services/roleService.js';
import { logger } from '../../utils/logger.js';

/**
 * Handles the button interaction to grant or remove roles.
 */
export async function handleSelfRoleButton(interaction: ButtonInteraction): Promise<void> {
  const member = interaction.member as GuildMember;
  if (!member) {
    logger.warning(`Self-role button clicked outside a server: ${interaction.user.tag}`);
    await interaction.reply({
      content: 'This interaction must be used inside a Discord server.',
      ephemeral: true,
    });
    return;
  }

  const customId = interaction.customId;

  try {
    // 1. Grow a Garden Role Toggle
    if (customId === SELF_ROLE.BUTTON_ID) {
      const gagRoleId = SELF_ROLE.GAG_ROLE_ID;
      const hasGag = roleService.hasRole(member, gagRoleId);

      if (!hasGag) {
        await roleService.addRole(member, gagRoleId);
        await roleService.ensureMemberRole(member);
        await interaction.reply({
          content: '✅ Welcome to Star Syndrome!\n\nYou now have access to Grow a Garden.',
          ephemeral: true,
        });
      } else {
        await roleService.removeRole(member, gagRoleId);
        await interaction.reply({
          content: '❎ Grow a Garden role removed.',
          ephemeral: true,
        });
      }
      return;
    }

    // 2. Female Role Toggle (Mutually exclusive with Male)
    if (customId === SELF_ROLE.FEMALE_BUTTON_ID) {
      const femaleRoleId = SELF_ROLE.FEMALE_ROLE_ID;
      const maleRoleId = SELF_ROLE.MALE_ROLE_ID;
      const hasFemale = roleService.hasRole(member, femaleRoleId);

      if (!hasFemale) {
        await roleService.addRole(member, femaleRoleId);
        await roleService.ensureMemberRole(member);

        // Remove Male role if they have it
        if (roleService.hasRole(member, maleRoleId)) {
          await roleService.removeRole(member, maleRoleId);
        }

        await interaction.reply({
          content: '✅ Female role identifier assigned.',
          ephemeral: true,
        });
      } else {
        await roleService.removeRole(member, femaleRoleId);
        await interaction.reply({
          content: '❎ Female role identifier removed.',
          ephemeral: true,
        });
      }
      return;
    }

    // 3. Male Role Toggle (Mutually exclusive with Female)
    if (customId === SELF_ROLE.MALE_BUTTON_ID) {
      const femaleRoleId = SELF_ROLE.FEMALE_ROLE_ID;
      const maleRoleId = SELF_ROLE.MALE_ROLE_ID;
      const hasMale = roleService.hasRole(member, maleRoleId);

      if (!hasMale) {
        await roleService.addRole(member, maleRoleId);
        await roleService.ensureMemberRole(member);

        // Remove Female role if they have it
        if (roleService.hasRole(member, femaleRoleId)) {
          await roleService.removeRole(member, femaleRoleId);
        }

        await interaction.reply({
          content: '✅ Male role identifier assigned.',
          ephemeral: true,
        });
      } else {
        await roleService.removeRole(member, maleRoleId);
        await interaction.reply({
          content: '❎ Male role identifier removed.',
          ephemeral: true,
        });
      }
      return;
    }
  } catch (error) {
    logger.error(`Failed to execute self-role button toggle for ${member.user.tag}:`, error);
    await interaction.reply({
      content: 'Failed to update roles. Please check bot permissions and role hierarchy.',
      ephemeral: true,
    });
  }
}
