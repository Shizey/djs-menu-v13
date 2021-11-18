import {MenuPage} from './Page';
import {MenuSelectPage} from './SelectPage';
import {EventEmitter} from 'events';

import {
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} from 'discord.js';

type pagesType = MenuPage|MenuSelectPage;

/**
 * The class that handle all the Menu logic
 * @class Menu
 * @extends EventEmitter
*/
export class Menu extends EventEmitter {
  pages: pagesType[];
  collector: any;
  interaction: CommandInteraction;
  ephemeral: boolean;
  /**
   * The interaction that the menu will use.
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
   * A function for add Page in the Menu
   * @param  {pagesType} page
   * @return {Menu}
   */
  addPage(page: pagesType):Menu {
    this.pages.push(page);
    return this;
  }
  /**
   * A function for start the menu
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
   * A function for stop the menu
   * @return {void}
   */
  stop():void {
    this.emit('stop', this.interaction, 'stop', this.pages);
  }
  /**
   * A function to set the page with a given MenuPage
   * @param  {pagesType} page
   * @return {void}
   */
  setPage(page: pagesType):void {
    this.displayPage(page);
    // This filter check by spliting the customId
    // If there is a ID linked to the button
    // Example : myid.123456789
    const filter = (i) =>
      i.user.id === this.interaction.user.id &&
      i.customId.split('.')[1] === this.interaction.user.id;

    this.collector = this.interaction.channel?.createMessageComponentCollector(
        {filter, time: page?.timeout, max: 1},
    );

    // When the page is set, that mean the page changed.
    this.emit('pageChanged', page, this.interaction, this.pages);

    // Stop the collector if the stop event is emitted
    this.once('stop', () => {
      this.collector.stop();
    });

    this.collector?.on('collect', (i) => {
      // Get the ID of the button
      const id = i.customId.split('.')[0];
      i.deferUpdate();

      const btnPage = (page as MenuPage);
      if (btnPage.type === 'MenuPage') {
        // Get the button by the ID
        const findBtn = btnPage.buttons.find(
            (button) => button.id === id,
        );

        if (findBtn && typeof findBtn.target !== 'function') {
          // Get the target from the button
          // To know what is the next page to display
          const target = findBtn.target;


          // Find the page to display with the target
          const nextPage = this.pages.find((ptf) => ptf.id === target);

          this.collector.stop();
          if (nextPage) this.setPage(nextPage);
        } else if (findBtn) {
          // Execute the function of the target with parameters
          const target = findBtn.target;
          const funcTarget = (
            target as (
              page:MenuPage|MenuSelectPage,
              interaction:CommandInteraction,
              Menu:this
              ) => void
          );
          funcTarget(page, this.interaction, this);
        }
      } else if (btnPage.type === 'MenuSelectPage') {
        // TODO : Add the function for the select page
        // With a select menu the value is the target
        const target = i.values[0];

        // Find the page to display with the target
        const nextPage = this.pages.find((ptf) => ptf.id === target);

        this.collector.stop();
        if (nextPage) this.setPage(nextPage);
      }
    });

    this.collector?.on('end', (collected) => {
      if (collected.size === 0) {
        // If the menu don't get any response stop the menu with noReply reason
        this.emit('stop', this.interaction, 'noReply', this.pages);
      }
    });
  }
  /**
   * A function for make all the message in the menu epehemeral
   * @param {boolean} isEphemeral
   * @return {Menu}
   */
  IsEphemeral(isEphemeral:boolean):Menu {
    this.ephemeral = isEphemeral;
    return this;
  }
  /**
   * A function to display a page given page
   * @param  {pagesType} page?
   * @return {void}
   */
  displayPage(page?: pagesType):void {
    const btnPage = (page as MenuPage);
    if (btnPage.type === 'MenuPage') {
      const content = page?.content || '.';
      const buttons = btnPage?.buttons || [];
      const raw = new MessageActionRow();
      for (const button of buttons) {
        const btn = new MessageButton()
            .setCustomId(`${button.id}.${this.interaction.user.id}`)
            .setLabel(`${button.label}`)
            .setStyle(button.style);
        if (button.emoji) {
          btn.setEmoji(button.emoji);
        }

        if (button?.url) {
          btn.setURL(`${button?.url}`);
        }

        raw.addComponents(btn);
      }
      if (this.interaction.replied) {
        this.interaction.editReply({
          embeds: btnPage?.embeds,
          content: `${content}`,
          components: [raw],
          files: btnPage?.files,
        });
      } else {
        this.interaction.reply({
          embeds: btnPage?.embeds,
          content: `${content}`,
          components: [raw],
          ephemeral: this.ephemeral,
          files: btnPage?.files,
        });
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

      if (this.interaction.replied) {
        this.interaction.editReply({
          embeds: selectPage?.embeds,
          content: `${content}`,
          components: [raw],
          files: selectPage?.files,
        });
      } else {
        this.interaction.reply({
          embeds: selectPage?.embeds,
          content: `${content}`,
          components: [raw],
          ephemeral: this.ephemeral,
          files: selectPage?.files,
        });
      }
    }
  }
}
