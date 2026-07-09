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
      .setTitle('⭐ Star Syndrome • Admin Panel')
      .setDescription(
        '# 🏠 Welcome to the StarBot Management Center\n\n' +
          'Manage all StarBot features directly from Discord.\n' +
          'Only Owner and Staff can access this panel.'
      )
      .addFields(
        { name: '🤖 Bot Status', value: '🟢 Online', inline: true },
        { name: '🗄️ Database Status', value: dbStatus, inline: true },
        { name: '🏷️ Version', value: 'v1.0.0', inline: true },
        { name: '⚡ Latency', value: latency, inline: true },
        { name: '⏱️ Uptime', value: uptime, inline: true }
      )
      .setColor('#8B5CF6') // Vibrant Purple
      .setTimestamp()
      .setFooter({ text: 'Star Syndrome • System Home', iconURL: client.user?.displayAvatarURL() });
  },
};

export default homePage;
