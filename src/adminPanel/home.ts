import { EmbedBuilder } from 'discord.js';
import mongoose from 'mongoose';
import { ExtendedClient } from '../types/index.js';
import { AdminPanelPage } from './types.js';

function formatUptime(ms: number): string {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  parts.push(`${seconds}s`);
  return parts.join(' ');
}

const homePage: AdminPanelPage = {
  id: 'home',
  label: 'Home',
  emoji: '🏠',
  render(client: ExtendedClient): EmbedBuilder {
    const isDbConnected = mongoose.connection.readyState === 1;
    const dbStatus = isDbConnected ? '🟢 Connected' : '🔴 Disconnected';
    const latency = client.ws.ping >= 0 ? `${client.ws.ping}ms` : 'Calculating...';
    const uptime = client.uptime ? formatUptime(client.uptime) : '0s';

    return new EmbedBuilder()
      .setTitle('<a:Rainbowstar:1522684445092478986> Star Syndrome • Admin Control Center')
      .setDescription(
        '┌─── · 。ﾟ☆: *.☽ .* :☆ﾟ. ───┐\n' +
          '   **Welcome to StarBot Panel**\n' +
          '└─── · 。ﾟ☆: *.☽ .* :☆ﾟ. ───┘\n\n' +
          '⚡ *Manage all features and configurations directly from this interactive dashboard.*\n\n' +
          '🔒 **Security Notice**\n' +
          '• Only Server Owners and authorized Staff members can utilize this panel.'
      )
      .addFields(
        { name: '🤖 Bot Status', value: '`🟢 Online`', inline: true },
        { name: '🗄️ Database', value: `\`${dbStatus}\``, inline: true },
        { name: '🏷️ Version', value: '`v1.0.0`', inline: true },
        { name: '⚡ Latency', value: `\`${latency}\``, inline: true },
        { name: '⏱️ Uptime', value: `\`${uptime}\``, inline: true }
      )
      .setThumbnail('attachment://StarBot.gif')
      .setColor('#8B5CF6') // Vibrant Purple
      .setTimestamp()
      .setFooter({ text: 'Star Syndrome • System Home', iconURL: client.user?.displayAvatarURL() });
  },
};

export default homePage;
