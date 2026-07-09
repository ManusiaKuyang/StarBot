import { Events, GuildMember } from 'discord.js';
import { ExtendedClient } from '../../types/index.js';
import { welcomeService } from '../../services/welcomeService.js';

export default {
  name: Events.GuildMemberRemove,
  async execute(member: GuildMember, _client: ExtendedClient) {
    await welcomeService.sendLeave(member);
  },
};
