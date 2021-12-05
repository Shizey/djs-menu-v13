const {Client, Intents, MessageEmbed} = require('discord.js');
const botIntents = [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES];
const client = new Client({intents: botIntents});
const {MenuPage, Menu, MenuSelectPage} = require('../build/index');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login('your token');

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    // You need to have a test command register to perform this command
    if (interaction.commandName === 'test') {
      const selectOptions = [
        {
          label: 'First Page',
          emoji: '1️⃣',
          target: 'firstPage',
          description: 'Go to the first page',
        },
        {
          label: 'Second Page',
          emoji: '2️⃣',
          target: 'secondPage',
          description: 'Go to the second page',
        },
        {
          label: 'Exit',
          emoji: '❌',
          target: (page, interaction, menu) => {
            menu.stop();
            interaction.editReply({
              content: 'The menu has just been closed',
              embeds: [],
              components: [],
            });
          },
          description: 'Exit the menu',
        },
      ];

      const BackMenuBtn = {
        label: 'return to select page',
        emoji: '⬅️',
        target: 'selectPage',
        style: 'PRIMARY',
      };

      const selectPage = new MenuSelectPage()
          .setId('selectPage')
          .setPlaceholder('What page do you want to go to ?')
          .addOptions(selectOptions);

      const firstEmbed = new MessageEmbed()
          .setTitle('First Page')
          .setColor('AQUA');

      const secondEmbed = new MessageEmbed()
          .setTitle('Second Page')
          .setColor('GOLD');

      const firstPage = new MenuPage()
          .setId('firstPage')
          .addButton(BackMenuBtn)
          .addEmbed(firstEmbed);

      const secondPage = new MenuPage()
          .setId('secondPage')
          .addButton(BackMenuBtn)
          .addEmbed(secondEmbed);

      const menu = new Menu(interaction)
          .addPage(selectPage)
          .addPage(firstPage)
          .addPage(secondPage)
          .start('selectPage');

      menu.on('stop', (interaction, reason) => {
        if (reason === 'noReply') {
          interaction.editReply({
            embeds: [],
            components: [],
            content: 'You did not respond quickly enough',
          });
        }
      });
    }
  }
});
