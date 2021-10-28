import {
  MessageButtonStyleResolvable,
  EmojiIdentifierResolvable,
} from 'discord.js';

/**
   */
export class MenuButton {
  label: string;
  style: MessageButtonStyleResolvable;
  target: string;
  emoji: EmojiIdentifierResolvable;
  url: string;
  id: string;
  /**
   */
  constructor() {
    this.label = '';
    this.style = 'PRIMARY';
    this.target = '';
    this.emoji = '';
    this.url = '';
    this.id = '';
  }
  /**
   * @param  {string} label
   * @return {MenuButton}
   */
  setLabel(label: string):MenuButton {
    this.label = label;
    return this;
  }
  /**
   * @param  {MessageButtonStyleResolvable} style
   * @return {MenuButton}
   */
  setStyle(style: MessageButtonStyleResolvable):MenuButton {
    this.style = style;
    return this;
  }
  /**
   * @param  {string} target
   * @return {MenuButton}
   */
  setTarget(target: string):MenuButton {
    this.target = target;
    return this;
  }
  /**
   * @param  {EmojiIdentifierResolvable} emoji
   * @return {MenuButton}
   */
  setEmoji(emoji: EmojiIdentifierResolvable):MenuButton {
    this.emoji = emoji;
    return this;
  }
  /**
   * @param  {string} url
   * @return {MenuButton}
   */
  setURL(url: string):MenuButton {
    this.url = url;
    return this;
  }
  /**
   * @param  {string} id
   * @return {MenuButton}
   */
  setId(id: string):MenuButton {
    this.id = id;
    return this;
  }
}
