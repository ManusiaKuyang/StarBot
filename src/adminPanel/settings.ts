import { EmbedBuilder } from 'discord.js';
import { ExtendedClient } from '../types/index.js';
import { AdminPanelPage } from './types.js';
import { config } from '../config/config.js';
import { TICKET_CONFIG } from '../config/ticket.js';

const settingsPage: AdminPanelPage = {
  id: 'settings',
  label: 'Settings',
  emoji: '⚙',
  render(client: ExtendedClient): EmbedBuilder {
    const ownerRole = TICKET_CONFIG.OWNER_ROLE_ID ? `<@&${TICKET_CONFIG.OWNER_ROLE_ID}>` : 'Not Configured';
    const staffRole = TICKET_CONFIG.STAFF_ROLE_ID ? `<@&${TICKET_CONFIG.STAFF_ROLE_ID}>` : 'Not Configured';

    return new EmbedBuilder()
      .setTitle('⚙️ General Bot Settings')
      .setDescription(
        '# ⚙️ StarBot Global Configuration\n\n' +
          'Review the core system environment values and access parameters.\n\n' +
          '### 🛠️ Client & Workspace Parameters\n' +
          `• **Client ID**: \`${config.clientId}\`\n` +
          `• **Guild ID**: \`${config.guildId}\`\n\n` +
          '### 🔐 Admin Panel Access Permissions\n' +
          `• **Owner Role**: ${ownerRole} (\`${TICKET_CONFIG.OWNER_ROLE_ID}\`)\n` +
          `• **Staff Role**: ${staffRole} (\`${TICKET_CONFIG.STAFF_ROLE_ID}\`)\n\n` +
          '### ℹ️ Access Scope\n' +
          'Only members who possess the roles specified above are permitted to utilize panel components.'
      )
      .setColor('#6B7280') // Gray
      .setTimestamp()
      .setFooter({ text: 'Star Syndrome • System Settings', iconURL: client.user?.displayAvatarURL() });
  },
};

export default settingsPage;
