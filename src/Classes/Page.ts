import {
  MessageAttachment,
  MessageEmbed,
} from 'discord.js';
import {MenuButton, SingleButton} from '..';
import randomId from '../Util/generateRandomId';

/**
 * This class that represent a page in a menu.
 * @class MenuPage
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
   * The ID of the page.
   * This ID will be used to identify the page in the button with target.
   * @param  {string} id
   * @return {MenuPage}
   */
  setId(id: string):MenuPage {
    if (!id) throw new Error('ID cannot be empty');
    this.id = id;
    return this;
  }
  /**
   * A function for add embed that will display in the message page
   * @param  {MessageEmbed} embed
   * @return {MenuPage}
   */
  addEmbed(embed: MessageEmbed):MenuPage {
    if (!embed) throw new Error('Embed cannot be empty');
    this.embeds.push(embed);
    return this;
  }
  /**
   * A function for set the content of the Discord message.
   * @param  {string} content
   * @return {MenuPage}
   */
  setContent(content: string):MenuPage {
    if (!content) throw new Error('Content cannot be empty');
    this.content = content;
    return this;
  }
  /**
   * A function for add a button to the page.
   * The target is the ID of the page that will be displayed
   * when the button is clicked.
   * @param  {MenuButton} button
   * @return {MenuPage}
   */
  addButton(button: SingleButton):MenuPage {
    if (!button) throw new Error('Button cannot be empty');

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
   * A function for set the timeout
   * before that you are unable to interact with the page.
   * @param {number} timeout
   * @return {MenuPage}
   */
  setTimeout(timeout: number):MenuPage {
    if (!timeout) throw new Error('Timeout cannot be empty');
    this.timeout = timeout;
    return this;
  }
  /**
   * A function for add a file that will displayed in the page.
   * @param {file} file
   * @return {MenuPage}
   */
  addFile(file: MessageAttachment):MenuPage {
    if (!file) throw new Error('File cannot be empty');
    this.files.push(file);
    return this;
  }
}
