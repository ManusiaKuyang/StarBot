import { EmbedBuilder } from 'discord.js';
import { ExtendedClient } from '../types/index.js';
import { AdminPanelPage } from './types.js';
import { SELF_ROLE } from '../config/selfRole.js';

const selfRolePage: AdminPanelPage = {
  id: 'self_role',
  label: 'Self Role',
  emoji: '🌱',
  render(client: ExtendedClient): EmbedBuilder {
    const channel = SELF_ROLE.CHANNEL_ID ? `<#${SELF_ROLE.CHANNEL_ID}>` : 'Not Configured';
    const memberRole = SELF_ROLE.MEMBER_ROLE_ID ? `<@&${SELF_ROLE.MEMBER_ROLE_ID}>` : 'Not Configured';
    const gagRole = SELF_ROLE.GAG_ROLE_ID ? `<@&${SELF_ROLE.GAG_ROLE_ID}>` : 'Not Configured';
    const femaleRole = SELF_ROLE.FEMALE_ROLE_ID ? `<@&${SELF_ROLE.FEMALE_ROLE_ID}>` : 'Not Configured';
    const maleRole = SELF_ROLE.MALE_ROLE_ID ? `<@&${SELF_ROLE.MALE_ROLE_ID}>` : 'Not Configured';

    return new EmbedBuilder()
      .setTitle('<a:Rainbowstar:1522684445092478986> Self-Assignable Roles System')
      .setDescription(
        '┌─── · 。ﾟ☆: *.☽ .* :☆ﾟ. ───┐\n' +
          '      **Self Role Settings**\n' +
          '└─── · 。ﾟ☆: *.☽ .* :☆ﾟ. ───┘\n\n' +
          'Configure public roles that members can assign themselves dynamically.\n\n' +
          '### ⚙️ Channel & General Roles\n' +
          `• 📺 **Panel Channel**: ${channel}\n` +
          `• 🏷️ **Member Indicator Role**: ${memberRole}\n\n` +
          '### 🌱 Feature Roles\n' +
          `• 🌿 **Grow a Garden Role**: ${gagRole}\n` +
          `• 👩 **Female Role**: ${femaleRole} (Emoji: <:Female:${SELF_ROLE.FEMALE_EMOJI}>)\n` +
          `• 👨 **Male Role**: ${maleRole} (Emoji: <:Male:${SELF_ROLE.MALE_EMOJI}>)\n\n` +
          '### ℹ️ Overview\n' +
          'Buttons are sent in the configured Self Role channel. Clicking toggles the respective roles on/off.'
      )
      .setThumbnail('attachment://StarBot.gif')
      .setColor('#10B981') // Emerald Green
      .setTimestamp()
      .setFooter({ text: 'Star Syndrome • Self Role Config', iconURL: client.user?.displayAvatarURL() });
  },
};

export default selfRolePage;
