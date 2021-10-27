import {MessageEmbed} from 'discord.js';
import {MenuButtonInterface, MenuPageInterface} from '../interfaces';
/**
   */
export class MenuPage {
  id: string;
  embeds: MessageEmbed[];
  content: string;
  buttons: MenuButtonInterface[];
  /**
   */
  constructor() {
    this.id = '';
    this.embeds = [];
    this.content = '';
    this.buttons = [];
  }
  /**
   * @param  {string} id
   * @return {MenuPageInterface}
   */
  setId(id: string):MenuPageInterface {
    this.id = id;
    return this;
  }
  /**
   * @param  {MessageEmbed} embed
   * @return {MenuPageInterface}
   */
  addEmbed(embed: MessageEmbed):MenuPageInterface {
    this.embeds.push(embed);
    return this;
  }
  /**
   * @param  {string} content
   * @return {MenuPageInterface}
   */
  setContent(content: string):MenuPageInterface {
    this.content = content;
    return this;
  }
  /**
   * @param  {MenuButtonInterface} button
   * @return {MenuPageInterface}
   */
  addButton(button: MenuButtonInterface):MenuPageInterface {
    this.buttons.push(button);
    return this;
  }
}
