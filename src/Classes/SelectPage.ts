import {
  CommandInteraction,
  EmojiIdentifierResolvable,
  MessageAttachment,
  MessageEmbed,
} from 'discord.js';
import randomId from '../Util/generateRandomId';
import {Menu} from './Menu';
import {MenuPage} from './Page';

type SelectChoice = {
  target: string|((
    page:MenuPage|MenuSelectPage, interaction:CommandInteraction, menu:Menu
    ) => void);
  label: string;
  description?: string;
  emoji?: EmojiIdentifierResolvable;
}

type MenuSelectChoice = {
  target: string|((
    page:MenuPage|MenuSelectPage, interaction:CommandInteraction, menu:Menu
    ) => void);
  value: string;
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
  options: MenuSelectChoice[];
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
    if (!id) throw new Error('The ID of the page can not be empty.');
    this.id = id;
    return this;
  }
  /**
   * A function for set the placeholder of the Discord Select Menu.
   * @param  {string} placeholder
   * @return {MenuSelectPage}
   */
  setPlaceholder(placeholder: string):MenuSelectPage {
    // eslint-disable-next-line max-len
    if (!placeholder) throw new Error('The placeholder of the page can not be empty.');
    this.placeholder = placeholder;
    return this;
  }
  /**
   * A function for add embed that will display in the message page.
   * @param  {MessageEmbed} embed
   * @return {MenuSelectPage}
   */
  addEmbed(embed: MessageEmbed):MenuSelectPage {
    if (!embed) throw new Error('The embed can not be empty.');
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
    if (!options) throw new Error('Options can not be empty.');
    options.forEach((option) =>{
      if (typeof option.target === 'function') {
        this.options.push({
          label: option.label,
          target: option.target,
          value: `${randomId()}.${this.id}`,
          description: option?.description,
          emoji: option?.emoji,
        });
      } else {
        this.options.push({
          label: option.label,
          target: option.target,
          value: `${randomId()}.${this.id}`,
          description: option?.description,
          emoji: option?.emoji,
        });
      }
    });
    return this;
  }
  /**
   * The same function as addOptions but for one option
   * @param  {SelectChoice} option
   * @return {MenuSelectPage}
   */
  addOption(option: SelectChoice):MenuSelectPage {
    if (!option) throw new Error('Option can not be empty.');
    if (typeof option.target === 'function') {
      this.options.push({
        label: option.label,
        target: option.target,
        value: `${randomId()}.${this.id}`,
        description: option?.description,
        emoji: option?.emoji,
      });
    } else {
      this.options.push({
        label: option.label,
        target: option.target,
        value: `${randomId()}.${this.id}`,
        description: option?.description,
        emoji: option?.emoji,
      });
    }
    return this;
  }
  /**
   * A function for set the content of the Discord message.
   * @param  {string} content
   * @return {MenuSelectPage}
   */
  setContent(content: string):MenuSelectPage {
    if (!content) throw new Error('Content cannot be empty');
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
    if (!timeout) throw new Error('Timeout can not be empty.');
    this.timeout = timeout;
    return this;
  }

  /**
   * A function for add a file that will displayed in the page.
   * @param  {MessageAttachment} file
   * @return {MenuSelectPage}
   */
  addFile(file: MessageAttachment):MenuSelectPage {
    if (!file) throw new Error('File can not be empty.');
    this.files.push(file);
    return this;
  }
}
