const {Client, Intents, MessageEmbed} = require('discord.js');
const botIntents = [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES];
const client = new Client({intents: botIntents});
const {MenuSelectPage, Menu, MenuPage, MenuButton} = require('../build/index');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login('ODI5ODY1MDM1MzkxODI4MDE4.YG-WCg.hLl1EWN-E6zq96x8U1h6dWtp1No');

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    if (interaction.commandName === 'test') {
      const SelectPage = new MenuSelectPage()
          .setId('select')
          .setPlaceholder('De quelle couleur doit être l\'embed ?')
          .addOptions(
              [
                {
                  label: 'Embed Vert',
                  emoji: '🟢',
                  target: 'PageVerte',
                  description: 'Mettre l\'embed en vert',
                },
                {
                  label: 'Embed Rouge',
                  emoji: '🔴',
                  target: 'PageRouge',
                  description: 'Mettre l\'embed en rouge',
                },
              ],
          );

      const BackMenuBtn = new MenuButton()
          .setId('Back')
          .setLabel('Changer la couleur')
          .setTarget('select')
          .setEmoji('⏪');

      const greenEmbed = new MessageEmbed()
          .setColor('GREEN')
          .setTitle('L\'embed est vert');
      const redEmbed = new MessageEmbed()
          .setColor('RED')
          .setTitle('L\'embed est rouge');

      const PageVerte = new MenuPage()
          .setId('PageVerte')
          .setTimeout(100000)
          .addButton(BackMenuBtn)
          .addEmbed(greenEmbed);

      const PageRouge = new MenuPage()
          .setId('PageRouge')
          .setTimeout(100000)
          .addButton(BackMenuBtn)
          .addEmbed(redEmbed);

      new Menu(interaction)
          .addPage(SelectPage)
          .addPage(PageVerte)
          .addPage(PageRouge)
          .start('select');
    }
  }
});
