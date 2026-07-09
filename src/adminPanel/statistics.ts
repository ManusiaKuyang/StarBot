import { EmbedBuilder } from 'discord.js';
import { ExtendedClient } from '../types/index.js';
import { AdminPanelPage } from './types.js';
import { config } from '../config/config.js';

const statisticsPage: AdminPanelPage = {
  id: 'statistics',
  label: 'Statistics',
  emoji: '📊',
  render(client: ExtendedClient): EmbedBuilder {
    const guild = client.guilds.cache.get(config.guildId);
    const memberCount = guild?.memberCount !== undefined ? `${guild.memberCount}` : 'Not Loaded';
    const activeGuilds = client.guilds.cache.size;
    const activeChannels = client.channels.cache.size;

    const memory = process.memoryUsage();
    const heapUsed = `${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB`;
    const heapTotal = `${(memory.heapTotal / 1024 / 1024).toFixed(2)} MB`;
    const rss = `${(memory.rss / 1024 / 1024).toFixed(2)} MB`;

    return new EmbedBuilder()
      .setTitle('<a:Rainbowstar:1522684445092478986> Server & Bot Statistics')
      .setDescription(
        '┌─── · 。ﾟ☆: *.☽ .* :☆ﾟ. ───┐\n' +
          '      **System Metrics**\n' +
          '└─── · 。ﾟ☆: *.☽ .* :☆ﾟ. ───┘\n\n' +
          'Monitor real-time statistics regarding your guild and bot performance.\n\n' +
          '### 📈 Guild Performance\n' +
          `• 👥 **Total Guild Members**: \`${memberCount}\`\n` +
          `• 🌐 **Monitoring Guilds**: \`${activeGuilds}\`\n` +
          `• 📁 **Cached Channels**: \`${activeChannels}\`\n\n` +
          '### 🖥️ Bot Resource Usage\n' +
          `• 💾 **RSS Memory**: \`${rss}\`\n` +
          `• ⚙️ **Heap Total**: \`${heapTotal}\`\n` +
          `• 📊 **Heap Used**: \`${heapUsed}\` \n\n` +
          '### 💡 Info\n' +
          'Click the Refresh button under this panel to update these metrics at any time.'
      )
      .setThumbnail('attachment://StarBot.gif')
      .setColor('#EC4899') // Pink
      .setTimestamp()
      .setFooter({ text: 'Star Syndrome • Performance Stats', iconURL: client.user?.displayAvatarURL() });
  },
};

export default statisticsPage;
