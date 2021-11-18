import {
  EmojiIdentifierResolvable,
  MessageAttachment,
  MessageEmbed,
  MessageSelectOptionData,
} from 'discord.js';

type SelectChoice = {
  target: string;
  label: string;
  description?: string;
  emoji?: EmojiIdentifierResolvable;
}

/**
 * The class that represents a page with the Discord Select Menu in a menu.
 * @class MenuSelectPage
*/
export class MenuSelectPage {
  id: string;
  placeholder: string;
  options: MessageSelectOptionData[];
  files: MessageAttachment[];
  content: string;
  timeout: number;
  embeds: MessageEmbed[];
  type: string;

  /**
   */
  constructor() {
    this.id = '';
    this.placeholder = '';
    this.files = [];
    this.options = [];
    this.content = '';
    this.timeout = 6000;
    this.type = 'MenuSelectPage';
    this.embeds = [];
  }
  /**
   * A function for set the ID of the page.
   * This ID will be used to identify the page in the button with target.
   * @param  {string} id
   * @return {MenuSelectPage}
   */
  setId(id: string):MenuSelectPage {
    this.id = id;
    return this;
  }
  /**
   * A function for set the placeholder of the Discord Select Menu.
   * @param  {string} placeholder
   * @return {MenuSelectPage}
   */
  setPlaceholder(placeholder: string):MenuSelectPage {
    this.placeholder = placeholder;
    return this;
  }
  /**
   * A function for add embed that will display in the message page.
   * @param  {MessageEmbed} embed
   * @return {MenuSelectPage}
   */
  addEmbed(embed: MessageEmbed):MenuSelectPage {
    this.embeds.push(embed);
    return this;
  }
  /**
   * A function for add all the options in the Discord Select Menu.
   * The difference between normal choices in Select Menu and SelectChoice
   * Is SelectChoice have a target instead of a value
   * But it's just for know that the value of the select menu is the target.
   * @param  {SelectChoice[]} options
   * @return {MenuSelectPage}
   */
  addOptions(options: SelectChoice[]):MenuSelectPage {
    options.forEach((option) =>{
      this.options.push({
        label: option.label,
        value: option.target,
        description: option?.description,
        emoji: option?.emoji,
      });
    });
    return this;
  }
  /**
   * The same function as addOptions but for one option
   * @param  {SelectChoice} option
   * @return {MenuSelectPage}
   */
  addOption(option: SelectChoice):MenuSelectPage {
    this.options.push({
      label: option.label,
      value: option.target,
      description: option?.description,
      emoji: option?.emoji,
    });
    return this;
  }
  /**
   * A function for set the content of the Discord message.
   * @param  {string} content
   * @return {MenuSelectPage}
   */
  setContent(content: string):MenuSelectPage {
    this.content = content;
    return this;
  }
  /**
   * A function for set the timeout
   * before that you are unable to interact with the page.
   * @param {number} timeout
   * @return {MenuSelectPage}
   */
  setTimeout(timeout: number):MenuSelectPage {
    this.timeout = timeout;
    return this;
  }

  /**
   * A function for add a file that will displayed in the page.
   * @param  {MessageAttachment} file
   * @return {MenuSelectPage}
   */
  addFile(file: MessageAttachment):MenuSelectPage {
    this.files.push(file);
    return this;
  }
}
