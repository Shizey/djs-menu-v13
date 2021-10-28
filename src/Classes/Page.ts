import {MessageEmbed} from 'discord.js';
import {MenuButton} from './Button';
/**
   */
export class MenuPage {
  id: string;
  embeds: MessageEmbed[];
  content: string;
  buttons: MenuButton[];
  timeout: number;
  /**
   */
  constructor() {
    this.id = '';
    this.embeds = [];
    this.content = '';
    this.buttons = [];
    this.timeout = 6000;
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
  addButton(button: MenuButton):MenuPage {
    this.buttons.push(button);
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
}
