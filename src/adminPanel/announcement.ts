import { EmbedBuilder } from 'discord.js';
import { ExtendedClient } from '../types/index.js';
import { AdminPanelPage } from './types.js';

const announcementPage: AdminPanelPage = {
  id: 'announcement',
  label: 'Announcement',
  emoji: '📢',
  render(client: ExtendedClient): EmbedBuilder {
    return new EmbedBuilder()
      .setTitle('<a:Rainbowstar:1522684445092478986> Announcement Manager')
      .setDescription(
        '┌─── · 。ﾟ☆: *.☽ .* :☆ﾟ. ───┐\n' +
          '     **Announcement Hub**\n' +
          '└─── · 。ﾟ☆: *.☽ .* :☆ﾟ. ───┘\n\n' +
          'Publish, edit, and schedule announcements to keep server members informed.\n\n' +
          '### 📢 Key Features\n' +
          '• **Rich Embeds**: Send beautifully styled embeds with colors and custom thumbnail icons.\n' +
          '• **Mention Alerts**: Toggle pinging `@everyone`, `@here`, or custom notification roles.\n' +
          '• **Interactive Additions**: Attach custom buttons (e.g. website link, check-in reactions) to announcement messages.\n\n' +
          '### 💡 Info\n' +
          'Future developments will allow triggering announcement creator modals directly from here.'
      )
      .setThumbnail('attachment://StarBot.gif')
      .setColor('#EF4444') // Red
      .setTimestamp()
      .setFooter({ text: 'Star Syndrome • Announcement Manager', iconURL: client.user?.displayAvatarURL() });
  },
};

export default announcementPage;
