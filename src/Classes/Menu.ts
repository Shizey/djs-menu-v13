import {MenuPage} from './Page';
import {MenuSelectPage} from './SelectPage';
import {EventEmitter} from 'events';
import {
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} from 'discord.js';
import {pagesType} from '..';

/**
 * The class that handle all the Menu logic
 * @class Menu
 * @extends EventEmitter
 * @noInheritDoc
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
    if (!page) throw new Error('The page is undefined');
    this.pages.push(page);
    return this;
  }
  /**
   * A function for start the menu
   * @param  {string} id
   * @return {Menu}
   */
  start(id: string):Menu {
    if (!id) throw new Error('The id is undefined');
    if (!this.interaction) throw new Error('The interaction is invalid');
    const findPage = this.pages.find((page) => page.id === id);
    if (!findPage) throw new Error(`The page with id ${id} was not found`);
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
      i.deferUpdate();
      const btnPage = (page as MenuPage);
      if (btnPage.type === 'MenuPage') {
        const id = i.customId.split('.')[0];
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
        // Get the value of the select wich is randomId.pageId
        const value = i.values[0].split('.');

        // Find the page who is linked to the select
        const currentPage = this.pages.find((ptf) => ptf.id === value[1]);

        // Find the target of the select
        const currentChoice = (currentPage as MenuSelectPage).options.find(
            (option) => option.value.split('.')[0] === value[0],
        );

        if (!currentChoice) {
          throw new Error('The target was not found');
        }

        if (typeof currentChoice.target === 'function') {
          const funcTarget = (
            currentChoice.target as (
              page:MenuPage|MenuSelectPage,
              interaction:CommandInteraction,
              Menu:this
              ) => void
          );
          funcTarget(page, this.interaction, this);
        } else {
          this.collector.stop();
          const nextPage = this.pages.find(
              (ptf) => ptf.id === currentChoice.target,
          );
          if (nextPage) this.setPage(nextPage);
        }
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
  isEphemeral(isEphemeral:boolean):Menu {
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

      // FIXME : Find a way to not have duplicate image
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

      // FIXME : Find a way to not have duplicate image
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
