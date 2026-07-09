import { EmbedBuilder } from 'discord.js';
import { ExtendedClient } from '../types/index.js';

export interface AdminPanelPage {
  id: string;
  label: string;
  emoji: string;
  render: (client: ExtendedClient) => Promise<EmbedBuilder> | EmbedBuilder;
}
