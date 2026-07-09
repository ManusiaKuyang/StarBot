import { GuildMember } from 'discord.js';
import { SELF_ROLE } from '../config/selfRole.js';
import { logger } from '../utils/logger.js';

export const roleService = {
  /**
   * Checks if a guild member has a role.
   */
  hasRole(member: GuildMember, roleId: string): boolean {
    return member.roles.cache.has(roleId);
  },

  /**
   * Adds a role to a guild member if they don't already have it.
   */
  async addRole(member: GuildMember, roleId: string): Promise<void> {
    if (this.hasRole(member, roleId)) {
      return;
    }
    await member.roles.add(roleId);
    logger.info(`Role ${roleId} added to user ${member.user.tag}.`);
  },

  /**
   * Removes a role from a guild member if they currently have it.
   */
  async removeRole(member: GuildMember, roleId: string): Promise<void> {
    if (!this.hasRole(member, roleId)) {
      return;
    }
    await member.roles.remove(roleId);
    logger.info(`Role ${roleId} removed from user ${member.user.tag}.`);
  },

  /**
   * Ensures the member has the default Member role.
   * @returns Promise<boolean> - true if the role was added, false if they already had it
   */
  async ensureMemberRole(member: GuildMember): Promise<boolean> {
    const memberRoleId = SELF_ROLE.MEMBER_ROLE_ID;
    if (this.hasRole(member, memberRoleId)) {
      return false;
    }
    await this.addRole(member, memberRoleId);
    return true;
  },
};
