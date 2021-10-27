import {
  MessageButtonStyleResolvable,
  EmojiIdentifierResolvable,
} from 'discord.js';
import {MenuButtonInterface} from '../interfaces';
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
   * @return {MenuButtonInterface}
   */
  setLabel(label: string):MenuButtonInterface {
    this.label = label;
    return this;
  }
  /**
   * @param  {MessageButtonStyleResolvable} style
   * @return {MenuButtonInterface}
   */
  setStyle(style: MessageButtonStyleResolvable):MenuButtonInterface {
    this.style = style;
    return this;
  }
  /**
   * @param  {string} target
   * @return {MenuButtonInterface}
   */
  setTarget(target: string):MenuButtonInterface {
    this.target = target;
    return this;
  }
  /**
   * @param  {EmojiIdentifierResolvable} emoji
   * @return {MenuButtonInterface}
   */
  setEmoji(emoji: EmojiIdentifierResolvable):MenuButtonInterface {
    this.emoji = emoji;
    return this;
  }
  /**
   * @param  {string} url
   * @return {MenuButtonInterface}
   */
  setURL(url: string):MenuButtonInterface {
    this.url = url;
    return this;
  }
  /**
   * @param  {string} id
   * @return {MenuButtonInterface}
   */
  setId(id: string):MenuButtonInterface {
    this.id = id;
    return this;
  }
}
