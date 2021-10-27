import {
  EmojiIdentifierResolvable,
  MessageButtonStyleResolvable,
  MessageEmbed,
  CommandInteraction,
} from 'discord.js';
import {EventEmitter} from 'events';

export interface MenuButtonInterface {
    label: string;
    style: MessageButtonStyleResolvable;
    target: string;
    emoji: EmojiIdentifierResolvable;
    url: string;
    id: string;
  }

export interface MenuPageInterface {
    id: string;
    embeds: MessageEmbed[];
    content: string;
    buttons: MenuButton[];
  }

export interface MenuResolvable {
    event: EventEmitter;
    pages: MenuPageInterface[];
    interaction: CommandInteraction;
    collector: any;
    start: Function;
    stop: Function;
    addPage: Function;
    setPage: Function;
    displayPage: Function;
}
