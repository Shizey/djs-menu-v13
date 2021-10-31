import {
  EmojiIdentifierResolvable,
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
   */
export class MenuSelectPage {
  id: string;
  placeholder: string;
  options: MessageSelectOptionData[];
  content: string;
  timeout: number;
  embeds: MessageEmbed[];
  type: string;
  /**
   */
  constructor() {
    this.id = '';
    this.placeholder = '';
    this.options = [];
    this.content = '';
    this.timeout = 6000;
    this.type = 'MenuSelectPage';
    this.embeds = [];
  }
  /**
   * @param  {string} id
   * @return {MenuSelectPage}
   */
  setId(id: string):MenuSelectPage {
    this.id = id;
    return this;
  }
  /**
   * @param  {string} placeholder
   * @return {MenuSelectPage}
   */
  setPlaceholder(placeholder: string):MenuSelectPage {
    this.placeholder = placeholder;
    return this;
  }
  /**
   * @param  {MessageEmbed} embed
   * @return {MenuSelectPage}
   */
  addEmbed(embed: MessageEmbed):MenuSelectPage {
    this.embeds.push(embed);
    return this;
  }
  /**
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
   * @param  {string} content
   * @return {MenuSelectPage}
   */
  setContent(content: string):MenuSelectPage {
    this.content = content;
    return this;
  }
  /**
   * @param {number} timeout
   * @return {MenuSelectPage}
   */
  setTimeout(timeout: number):MenuSelectPage {
    this.timeout = timeout;
    return this;
  }
}
