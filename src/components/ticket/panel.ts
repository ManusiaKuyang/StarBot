import { createGuildRecruitmentEmbed } from '../../embeds/guildRecruitmentEmbed.js';
import { createGuildRecruitmentButton } from './applyButton.js';

/**
 * Compiles and returns the full message payload for the Guild Recruitment panel.
 */
export function getGuildRecruitmentPanel() {
  return {
    embeds: [createGuildRecruitmentEmbed()],
    components: [createGuildRecruitmentButton()],
  };
}
