const {Client, Intents, MessageEmbed} = require('discord.js');
const botIntents = [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES];
const client = new Client({intents: botIntents});
const {MenuPage, Menu} = require('../build/index');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login('your token');

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    // You need to have a test command register to perform this command
    if (interaction.commandName === 'test') {
      const nextPageBtn = {
        label: 'Go to second page',
        target: 'secondPage',
        style: 'PRIMARY',
      };

      const previousPageBtn = {
        label: 'Go to first page',
        target: 'firstPage',
        style: 'PRIMARY',
      };

      const exitBtn = {
        label: 'Exit',
        target: (page, interaction, menu) => {
          menu.stop();
          interaction.editReply({
            content: 'The menu has just been closed',
            embeds: [],
            components: [],
          });
        },
        style: 'DANGER',
      };

      const firstEmbed = new MessageEmbed()
          .setColor('GREEN')
          .setDescription('FIRST PAGE');
      const secondEmbed = new MessageEmbed()
          .setColor('YELLOW')
          .setDescription('SECOND PAGE');

      const firstPage = new MenuPage()
          .addEmbed(firstEmbed)
          .addButton(nextPageBtn)
          .setId('firstPage');

      const secondPage = new MenuPage()
          .addEmbed(secondEmbed)
          .addButton(previousPageBtn)
          .addButton(exitBtn)
          .setId('secondPage');

      const menu = new Menu(interaction)
          .addPage(firstPage)
          .addPage(secondPage)
          .start('firstPage');

      menu.on('stop', (interaction, reason) => {
        if (reason === 'noReply') {
          interaction.editReply({
            embeds: [],
            components: [],
            content: 'You did not respond quickly enough',
          });
        }
      });

      menu.on('pageChanged', (page, interaction, pages) => {
        console.log('the page just changed');
      });
    }
  }
});
