const {Client, Intents, MessageEmbed} = require('discord.js');
const botIntents = [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES];
const client = new Client({intents: botIntents});
const {MenuPage, Menu} = require('../build/index');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login('ODI5ODY1MDM1MzkxODI4MDE4.YG-WCg.hLl1EWN-E6zq96x8U1h6dWtp1No');

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    if (interaction.commandName === 'test') {
      const BlueEmbed = new MessageEmbed()
          .setColor('BLUE')
          .setTitle('Couleur de l\'embed : BLEU')
          .setFooter('Le menu va se stop apres 6 interactions');
      const RedEmbed = new MessageEmbed()
          .setColor('RED')
          .setTitle('Couleur de l\'embed : ROUGE')
          .setFooter('Le menu va se stop apres 6 interactions');

      const redButton = {
        label: 'Passer l\'embed en rouge',
        style: 'DANGER',
        target: 'RedPage',
      };

      const blueButton = {
        label: 'Passer l\'embed en bleu',
        style: 'PRIMARY',
        target: 'BluePage',
      };

      const BluePage = new MenuPage()
          .addEmbed(BlueEmbed)
          .addButton(redButton)
          .addButton(blueButton)
          .setTimeout(10000)
          .setId('BluePage');
      const RedPage = new MenuPage()
          .addEmbed(RedEmbed)
          .addButton(redButton)
          .addButton(blueButton)
          .setTimeout(5000)
          .setId('RedPage');

      const menu = new Menu(interaction)
          .addPage(BluePage)
          .addPage(RedPage)
          .setEphemeral(true)
          .start();

      let i = 0;

      menu.on('pageChanged', () => {
        i = i + 1;
        if (i === 6) {
          menu.stop();
        }
      });

      const stopEmbed = new MessageEmbed()
          .setColor('GREY')
          .setTitle('Vous avez cliquez plus de 6 fois');
      const noResponseEmbed = new MessageEmbed()
          .setColor('RED')
          .setTitle('Tu n\'as pas répondu assez vite');

      menu.on('stop', (interaction, reason) => {
        if (reason === 'noReply' ) {
          interaction.editReply({embeds: [noResponseEmbed], components: []});
        } else {
          interaction.editReply({embeds: [stopEmbed], components: []});
        }
      });
    }
  }
});
