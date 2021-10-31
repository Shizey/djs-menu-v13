import {MenuPage} from './Page';
import {MenuSelectPage} from './SelectPage';
import {EventEmitter} from 'events';

import {
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  ButtonInteraction,
  MessageSelectMenu,
} from 'discord.js';

type pagesType = MenuPage|MenuSelectPage;

/**
   */
export class Menu extends EventEmitter {
  pages: pagesType[];
  collector: any;
  interaction: CommandInteraction;
  ephemeral: boolean;
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
   * @param  {pagesType} page
   * @return {Menu}
   */
  addPage(page: pagesType):Menu {
    this.pages.push(page);
    return this;
  }
  /**
   * @param  {string} id
   * @return {Menu}
   */
  start(id: string):Menu {
    const findPage = this.pages.find((page) => page.id === id);
    const startPage = id && findPage ? findPage : this.pages[0];
    this.setPage(startPage);
    return this;
  }
  /**
   * @return {void}
   */
  stop():void {
    this.emit('stop', this.interaction, 'stop', this.pages);
  }
  /**
   * @param  {pagesType} page?
   * @param  {ButtonInteraction} iButton?
   * @return {void}
   */
  setPage(page?: pagesType, iButton?: ButtonInteraction):void {
    this.displayPage(page, iButton);
    const filter = (i) =>
      i.user.id === this.interaction.user.id &&
      i.customId.split('.')[1] === this.interaction.user.id;
    this.collector = this.interaction.channel?.createMessageComponentCollector(
        {filter, time: page?.timeout, max: 1},
    );

    this.emit('pageChanged', page, this.interaction, this.pages);

    this.once('stop', () => {
      this.collector.stop();
    });

    this.collector?.on('collect', (i) => {
      const id = i.customId.split('.')[0];

      const btnPage = (page as MenuPage);
      if (btnPage.type === 'MenuPage') {
        const target = btnPage?.buttons.find(
            (button) => button.id === id,
        )?.target;
        const newPage = this.pages.find((ptf) => ptf.id === target);

        this.collector.stop();
        this.setPage(newPage, i);
      } else if (btnPage.type === 'MenuSelectPage') {
        const target = i.values[0];
        const newPage = this.pages.find((ptf) => ptf.id === target);

        this.collector.stop();
        this.setPage(newPage, i);
      }
    });

    this.collector?.on('end', (collected) => {
      if (collected.size === 0) {
        this.emit('stop', this.interaction, 'noReply', this.pages);
      }
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
   * @param  {pagesType} page?
   * @param  {ButtonInteraction} iButton?
   * @return {void}
   */
  displayPage(page?: pagesType, iButton?: ButtonInteraction):void {
    const btnPage = (page as MenuPage);
    if (btnPage.type === 'MenuPage') {
      const content = page?.content || '.';
      const buttons = btnPage?.buttons || [];
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
          embeds: btnPage?.embeds,
          content: `${content}`,
          components: [raw],
        });
      } else {
        if (this.interaction.replied) {
          this.interaction.editReply({
            embeds: btnPage?.embeds,
            content: `${content}`,
            components: [raw],
          });
        } else {
          this.interaction.reply({
            embeds: btnPage?.embeds,
            content: `${content}`,
            components: [raw],
            ephemeral: this.ephemeral,
          });
        }
      }
    } else {
      const selectPage = (page as MenuSelectPage);
      const content = page?.content || '.';
      const selectMenuOptions = selectPage.options;

      const raw = new MessageActionRow();

      const selectMenu = new MessageSelectMenu()
          .addOptions(selectMenuOptions)
          .setCustomId(`${selectPage.id}.${this.interaction.user.id}`)
          .setPlaceholder(selectPage.placeholder);

      selectMenu.setMinValues(1);

      selectMenu.setMaxValues(1);

      raw.addComponents(selectMenu);

      if (iButton) {
        iButton.update({
          embeds: selectPage?.embeds,
          content: `${content}`,
          components: [raw],
        });
      } else {
        if (this.interaction.replied) {
          this.interaction.editReply({
            embeds: selectPage?.embeds,
            content: `${content}`,
            components: [raw],
          });
        } else {
          this.interaction.reply({
            embeds: selectPage?.embeds,
            content: `${content}`,
            components: [raw],
            ephemeral: this.ephemeral,
          });
        }
      }
    }
  }
}
