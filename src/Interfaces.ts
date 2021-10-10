import { EmojiIdentifierResolvable, MessageButtonStyleResolvable, MessageEmbed } from "discord.js";

export interface MenuPage {
  id: string;
  embeds: MessageEmbed[];
  content: string;
  buttons: MenuButton[];
}

export interface MenuButton {
  label: string;
  style: MessageButtonStyleResolvable;
  target: string;
  emoji: EmojiIdentifierResolvable;
  url: string;
  id: string;
}
