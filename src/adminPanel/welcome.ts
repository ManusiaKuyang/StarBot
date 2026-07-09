import { EmbedBuilder } from 'discord.js';
import { ExtendedClient } from '../types/index.js';
import { AdminPanelPage } from './types.js';
import { config } from '../config/config.js';

const welcomePage: AdminPanelPage = {
  id: 'welcome',
  label: 'Welcome System',
  emoji: '👋',
  render(client: ExtendedClient): EmbedBuilder {
    const welcomeChannel = config.welcomeChannelId ? `<#${config.welcomeChannelId}>` : 'Not Configured';
    const leaveChannel = config.leaveChannelId ? `<#${config.leaveChannelId}>` : 'Not Configured';

    return new EmbedBuilder()
      .setTitle('👋 Welcome System')
      .setDescription(
        '# 👋 Welcome & Leave Dashboard\n\n' +
          'Configure routing channels for user greetings when they join or leave the server.\n\n' +
          '### ⚙️ Routing Configuration\n' +
          `• **Welcome Channel**: ${welcomeChannel}\n` +
          `• **Leave Channel**: ${leaveChannel}\n\n` +
          '### 📝 Message Formats\n' +
          '• **Join Welcome Message** (sent to Welcome Channel):\n' +
          '  `Welcome to Star Syndrome! Make sure to read the guidelines.`\n' +
          '• **Leave Message** (sent to Leave Channel):\n' +
          '  `Has left the server. We will miss you!`\n\n' +
          '### 💡 Status\n' +
          'System is active. Whenever a member joins or leaves, the bot posts formatted greeting cards or messages.'
      )
      .setColor('#F59E0B') // Amber/Orange
      .setTimestamp()
      .setFooter({ text: 'Star Syndrome • Welcome System Config', iconURL: client.user?.displayAvatarURL() });
  },
};

export default welcomePage;
