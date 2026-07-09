import { GuildMember, TextChannel, OverwriteType, User, PermissionFlagsBits } from 'discord.js';
import { TICKET_CONFIG } from '../config/ticket.js';

export const permissionService = {
  /**
   * Checks if a member belongs to the recruitment staff or has the owner role.
   * If roles are not configured, falls back to checking for Administrator permissions.
   */
  isStaffOrOwner(member: GuildMember): boolean {
    const ownerRoleId = TICKET_CONFIG.OWNER_ROLE_ID;
    const staffRoleId = TICKET_CONFIG.STAFF_ROLE_ID;

    const hasOwner =
      ownerRoleId && ownerRoleId.trim() !== '' && member.roles.cache.has(ownerRoleId);
    const hasStaff =
      staffRoleId && staffRoleId.trim() !== '' && member.roles.cache.has(staffRoleId);

    if (hasOwner || hasStaff) {
      return true;
    }

    // Fallback if roles are empty
    if (
      (!ownerRoleId || ownerRoleId.trim() === '') &&
      (!staffRoleId || staffRoleId.trim() === '')
    ) {
      return member.permissions.has(PermissionFlagsBits.Administrator);
    }

    return false;
  },

  /**
   * Checks if a member can cancel this ticket (Owner, Staff, or Applicant).
   */
  async canCancel(member: GuildMember, channel: TextChannel): Promise<boolean> {
    if (this.isStaffOrOwner(member)) {
      return true;
    }

    const applicant = await this.getApplicant(channel);
    return applicant !== null && member.id === applicant.id;
  },

  /**
   * Resolves the original applicant of the ticket dynamically by scanning channel overwrites.
   */
  async getApplicant(channel: TextChannel): Promise<User | null> {
    const botId = channel.client.user?.id;
    const overwrites = channel.permissionOverwrites.cache;

    // Scan for member overwrites that don't belong to the bot
    const memberOverwrite = overwrites.find(
      (o) => o.type === OverwriteType.Member && o.id !== botId,
    );

    if (!memberOverwrite) {
      return null;
    }

    try {
      return await channel.client.users.fetch(memberOverwrite.id);
    } catch {
      return null;
    }
  },
};
