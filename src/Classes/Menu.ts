import {MenuPage} from './Page';
import {EventEmitter} from 'events';

import {
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  ButtonInteraction,
} from 'discord.js';
/**
   */
export class Menu extends EventEmitter {
  pages: MenuPage[];
  collector: any;
  interaction: CommandInteraction;
  ephemeral: boolean;
  // event: EventEmitter;
  /**
   * @param  {CommandInteraction} interaction
   */
  constructor(interaction: CommandInteraction) {
    super();
    this.pages = [];
    this.interaction = interaction;
    this.collector = {};
    this.ephemeral = false;
  }
  /**
   * @param  {MenuPage} page
   * @return {Menu}
   */
  addPage(page: MenuPage):Menu {
    this.pages.push(page);
    return this;
  }
  /**
   * @param  {string} id
   * @return {Menu}
   */
  start(id: string):Menu {
    const findPage = this.pages.find((page) => page.id === id);
    const startPage = id ? findPage : this.pages[0];
    this.setPage(startPage);
    return this;
  }
  /**
   * @return {void}
   */
  stop():void {
    this.emit('stop', this.interaction, this.pages);
  }
  /**
   * @param  {MenuPage} page?
   * @param  {ButtonInteraction} iButton?
   * @return {void}
   */
  setPage(page?: MenuPage, iButton?: ButtonInteraction):void {
    this.displayPage(page, iButton);
    const filter = (i) =>
      i.user.id === this.interaction.user.id &&
      i.customId.split('.')[1] === this.interaction.user.id;
    this.collector = this.interaction.channel?.createMessageComponentCollector(
        {filter, time: page?.timeout, max: 1},
    );

    this.emit('pageChanged', page, this.pages, this.interaction);

    this.once('stop', () => {
      this.collector.stop();
    });

    this.collector?.on('collect', (i) => {
      const id = i.customId.split('.')[0];

      const target = page?.buttons.find((button) => button.id === id)?.target;
      const newPage = this.pages.find((pageToFind) => pageToFind.id === target);

      this.collector.stop();
      this.setPage(newPage, i);
    });
  }
  /**
   * @param {boolean} isEphemeral
   * @return {Menu}
   */
  setEphemeral(isEphemeral:boolean):Menu {
    this.ephemeral = isEphemeral;
    return this;
  }
  /**
   * @param  {MenuPage} page?
   * @param  {ButtonInteraction} iButton?
   * @return {void}
   */
  displayPage(page?: MenuPage, iButton?: ButtonInteraction):void {
    const content = page?.content || '.';
    const buttons = page?.buttons || [];
    const raw = new MessageActionRow();
    for (const button of buttons) {
      raw.addComponents(
          new MessageButton()
              .setCustomId(`${button.id}.${this.interaction.user.id}`)
              .setLabel(`${button.label}`)
              .setStyle(button.style)
              .setEmoji(button.emoji)
              .setURL(`${button.url}`),
      );
    }
    if (iButton) {
      iButton.update({
        embeds: page?.embeds,
        content: `${content}`,
        components: [raw],
      });
    } else {
      if (this.interaction.replied) {
        this.interaction.editReply({
          embeds: page?.embeds,
          content: `${content}`,
          components: [raw],
        });
      } else {
        this.interaction.reply({
          embeds: page?.embeds,
          content: `${content}`,
          components: [raw],
          ephemeral: this.ephemeral,
        });
      }
    }
  }
}
