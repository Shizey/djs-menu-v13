import {
  CommandInteraction,
  EmojiIdentifierResolvable,
  MessageAttachment,
  MessageButtonStyleResolvable,
  MessageEmbed,
} from 'discord.js';
import {Menu, MenuSelectPage} from '..';


import randomId from '../Util/generateRandomId';

type SingleButton = {
  label: string;
  style: MessageButtonStyleResolvable;
  target: string;
  emoji?: EmojiIdentifierResolvable;
  url?: string;
}

type MenuButton = {
  label: string;
  style: MessageButtonStyleResolvable;
  target: string|((
    page:MenuPage|MenuSelectPage, interaction:CommandInteraction, menu:Menu
    ) => void);
  id:string;
  emoji?: EmojiIdentifierResolvable;
  url?: string;
}

/**
   */
export class MenuPage {
  id: string;
  embeds: MessageEmbed[];
  content: string;
  buttons: MenuButton[];
  files: MessageAttachment[];
  timeout: number;
  type:string;
  /**
   */
  constructor() {
    this.id = '';
    this.embeds = [];
    this.files = [];
    this.content = '';
    this.buttons = [];
    this.timeout = 6000;
    this.type = 'MenuPage';
  }
  /**
   * @param  {string} id
   * @return {MenuPage}
   */
  setId(id: string):MenuPage {
    this.id = id;
    return this;
  }
  /**
   * @param  {MessageEmbed} embed
   * @return {MenuPage}
   */
  addEmbed(embed: MessageEmbed):MenuPage {
    this.embeds.push(embed);
    return this;
  }
  /**
   * @param  {string} content
   * @return {MenuPage}
   */
  setContent(content: string):MenuPage {
    this.content = content;
    return this;
  }
  /**
   * @param  {MenuButton} button
   * @return {MenuPage}
   */
  addButton(button: SingleButton):MenuPage {
    this.buttons.push({
      label: button.label,
      emoji: button?.emoji,
      target: button.target,
      style: button.style,
      url: button?.url,
      id: randomId(),
    });
    return this;
  }
  /**
   * @param {number} timeout
   * @return {MenuPage}
   */
  setTimeout(timeout: number):MenuPage {
    this.timeout = timeout;
    return this;
  }
  /**
   * @param {file} file
   * @return {MenuPage}
   */
  addFile(file: MessageAttachment):MenuPage {
    this.files.push(file);
    return this;
  }
}
