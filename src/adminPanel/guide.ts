import { EmbedBuilder } from 'discord.js';
import { ExtendedClient } from '../types/index.js';
import { AdminPanelPage } from './types.js';
import { SERVER_GUIDE } from '../config/serverGuide.js';
import { SELF_ROLE } from '../config/selfRole.js';
import { TICKET_CONFIG } from '../config/ticket.js';

const guidePage: AdminPanelPage = {
  id: 'guide',
  label: 'Server Guide',
  emoji: '📖',
  render(client: ExtendedClient): EmbedBuilder {
    const channel = SERVER_GUIDE.CHANNEL_ID ? `<#${SERVER_GUIDE.CHANNEL_ID}>` : 'Not Configured';
    const selfRoleChannel = SELF_ROLE.CHANNEL_ID ? `<#${SELF_ROLE.CHANNEL_ID}>` : 'Not Configured';
    const ticketsChannel = TICKET_CONFIG.PANEL_CHANNEL_ID ? `<#${TICKET_CONFIG.PANEL_CHANNEL_ID}>` : 'Not Configured';

    return new EmbedBuilder()
      .setTitle('📖 Server Guide System')
      .setDescription(
        '# 📖 Server Guide panel Config\n\n' +
          'Configure the primary guidance embeds for new members.\n\n' +
          '### 📂 Guide Integration Channels\n' +
          `• **Guide Channel**: ${channel}\n` +
          `• **Self Role Channel**: ${selfRoleChannel}\n` +
          `• **Recruitment/Tickets Channel**: ${ticketsChannel}\n\n` +
          '### 📖 Features\n' +
          '• Resolves local server rules channels dynamically.\n' +
          '• Directs members to choose roles, read rules, and apply for guild recruitment.'
      )
      .setColor('#6366F1') // Indigo
      .setTimestamp()
      .setFooter({ text: 'Star Syndrome • Server Guide Config', iconURL: client.user?.displayAvatarURL() });
  },
};

export default guidePage;
