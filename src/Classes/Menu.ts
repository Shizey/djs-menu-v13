import {MenuPageInterface, MenuResolvable} from '../interfaces';
import {EventEmitter} from 'events';

import {
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  ButtonInteraction,
} from 'discord.js';
/**
   */
export class Menu {
  pages: MenuPageInterface[];
  collector: any;
  interaction: CommandInteraction;
  event: EventEmitter;
  /**
   * @param  {CommandInteraction} interaction
   */
  constructor(interaction: CommandInteraction) {
    this.pages = [];
    this.interaction = interaction;
    this.collector = {};
    this.event = new EventEmitter();
  }
  /**
   * @param  {MenuPageInterface} page
   * @return {MenuResolvable}
   */
  addPage(page: MenuPageInterface):MenuResolvable {
    this.pages.push(page);
    return {
      event: this.event,
      pages: this.pages,
      interaction: this.interaction,
      collector: this.collector,
      start: this.start,
      stop: this.stop,
      addPage: this.addPage,
      setPage: this.setPage,
      displayPage: this.displayPage,
    };
  }
  /**
   * @param  {string} id
   * @return {any}
   */
  start(id: string):any {
    const findPage = this.pages.find((page) => page.id === id);
    const startPage = id ? findPage : this.pages[0];
    this.setPage(startPage);
    return {
      event: this.event,
      stop: this.stop,
    };
  }
  /**
   * @return {void}
   */
  stop():void {
    this.event.emit('stopCollector');
  }
  /**
   * @param  {MenuPageInterface} page?
   * @param  {ButtonInteraction} iButton?
   * @return {void}
   */
  setPage(page?: MenuPageInterface, iButton?: ButtonInteraction):void {
    this.displayPage(page, iButton);
    const filter = (i) =>
      i.user.id === this.interaction.user.id &&
      i.customId.split('.')[1] === this.interaction.user.id;
    this.collector = this.interaction.channel?.createMessageComponentCollector(
        {filter, time: 60000, max: 1},
    );

    this.event.once('stopCollector', () => {
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
   * @param  {MenuPageInterface} page?
   * @param  {ButtonInteraction} iButton?
   * @return {void}
   */
  displayPage(page?: MenuPageInterface, iButton?: ButtonInteraction):void {
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
        });
      }
    }
  }
}
