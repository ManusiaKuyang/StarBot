import {
  Client,
  ClientOptions,
  Collection,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
  ButtonInteraction,
  AnySelectMenuInteraction,
  ModalSubmitInteraction,
} from 'discord.js';

// Interface representing a slash command structure
export interface Command {
  data:
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>
    | SlashCommandSubcommandsOnlyBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void;
}

// Interface representing a button interaction handler
export interface ButtonHandler {
  customId: string;
  execute: (interaction: ButtonInteraction) => Promise<void> | void;
}

// Interface representing a select menu interaction handler
export interface SelectMenuHandler {
  customId: string;
  execute: (interaction: AnySelectMenuInteraction) => Promise<void> | void;
}

// Interface representing a modal submission handler
export interface ModalHandler {
  customId: string;
  execute: (interaction: ModalSubmitInteraction) => Promise<void> | void;
}

// Interface representing a Discord event
export interface BotEvent {
  name: string;
  once?: boolean;
  execute: (...args: any[]) => Promise<void> | void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// Extended client that holds collections for registry
export class ExtendedClient extends Client {
  public commands = new Collection<string, Command>();
  public buttons = new Collection<string, ButtonHandler>();
  public selectMenus = new Collection<string, SelectMenuHandler>();
  public modals = new Collection<string, ModalHandler>();

  constructor(options: ClientOptions) {
    super(options);
  }
}
