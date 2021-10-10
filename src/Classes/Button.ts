import {
  MessageButtonStyleResolvable,
  EmojiIdentifierResolvable,
} from "discord.js";

export class MenuButton {
  label: string;
  style: MessageButtonStyleResolvable;
  target: string;
  emoji: EmojiIdentifierResolvable;
  url: string;
  id: string;

  constructor() {
    this.label = "";
    this.style = "PRIMARY";
    this.target = "";
    this.emoji = "";
    this.url = "";
    this.id = "";
  }

  setLabel(label: string) {
    this.label = label;
    return this;
  }

  setStyle(style: MessageButtonStyleResolvable) {
    this.style = style;
    return this;
  }

  setTarget(target: string) {
    this.target = target;
    return this;
  }

  setEmoji(emoji: EmojiIdentifierResolvable) {
    this.emoji = emoji;
    return this;
  }

  setURL(url: string) {
    this.url = url;
    return this;
  }

  setId(id: string) {
    this.id = id;
    return this;
  }
}