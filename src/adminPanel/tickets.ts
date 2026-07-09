import { EmbedBuilder } from 'discord.js';
import { ExtendedClient } from '../types/index.js';
import { AdminPanelPage } from './types.js';
import { TICKET_CONFIG } from '../config/ticket.js';

const ticketsPage: AdminPanelPage = {
  id: 'tickets',
  label: 'Ticket Management',
  emoji: '🎫',
  render(client: ExtendedClient): EmbedBuilder {
    const categoryId = TICKET_CONFIG.TICKET_CATEGORY_ID || 'Not Configured';
    const panelChannel = TICKET_CONFIG.PANEL_CHANNEL_ID ? `<#${TICKET_CONFIG.PANEL_CHANNEL_ID}>` : 'Not Configured';
    const logChannel = TICKET_CONFIG.LOG_CHANNEL_ID ? `<#${TICKET_CONFIG.LOG_CHANNEL_ID}>` : 'Not Configured';
    const staffRole = TICKET_CONFIG.STAFF_ROLE_ID ? `<@&${TICKET_CONFIG.STAFF_ROLE_ID}>` : 'Not Configured';

    return new EmbedBuilder()
      .setTitle('<a:Rainbowstar:1522684445092478986> Ticket & Recruitment Configuration')
      .setDescription(
        '┌─── · 。ﾟ☆: *.☽ .* :☆ﾟ. ───┐\n' +
          '   **Ticket & Apply System**\n' +
          '└─── · 。ﾟ☆: *.☽ .* :☆ﾟ. ───┘\n\n' +
          'Configure and monitor user support tickets and guild recruitment applications.\n\n' +
          '### ⚙️ System Settings\n' +
          `• 📁 **Ticket Category ID**: \`${categoryId}\`\n` +
          `• 📺 **Panel Channel**: ${panelChannel}\n` +
          `• 📜 **Log Channel**: ${logChannel}\n` +
          `• 🛡️ **Staff Role**: ${staffRole}\n\n` +
          '### 💡 Info & Guide\n' +
          'When members click the apply button, a private channel is created in the target category. ' +
          'Staff and Owner roles can accept, reject, or cancel applications using panel buttons.'
      )
      .setThumbnail('attachment://StarBot.gif')
      .setColor('#3B82F6') // Indigo/Blue
      .setTimestamp()
      .setFooter({ text: 'Star Syndrome • Ticket Panel', iconURL: client.user?.displayAvatarURL() });
  },
};

export default ticketsPage;
