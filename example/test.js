const { Client, Intents, MessageEmbed} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const {MenuPage, MenuButton, Menu} = require("../build/index");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.users.fetch("254316236178063361").then((user) => {
    user.send("Je suis en route.")
  })
  
  //client.users.fetch("312534493519020044").then((user) => {
    //user.send("Je suis en route.")
  //})
})

client.login("ODI5ODY1MDM1MzkxODI4MDE4.YG-WCg.hLl1EWN-E6zq96x8U1h6dWtp1No");

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    if (interaction.commandName === 'test') {
      const BlueEmbed = new MessageEmbed().setColor("BLUE").setTitle("Couleur de l'embed : BLEU");
      const RedEmbed = new MessageEmbed().setColor("RED").setTitle("Couleur de l'embed : ROUGE");

      const redButton = new MenuButton().setId("RED").setTarget("RedMenu").setLabel("Passer l'embed en rouge").setStyle("DANGER");
      const blueButton = new MenuButton().setId("BLUE").setTarget("BlueMenu").setLabel("Passer l'embed en bleu").setStyle("PRIMARY");

      const BluePage = new MenuPage().addEmbed(BlueEmbed).addButton(redButton).addButton(blueButton).setId("BlueMenu");
      const RedPage = new MenuPage().addEmbed(RedEmbed).addButton(redButton).addButton(blueButton).setId("RedMenu");

      const menu = new Menu(interaction).addPage(BluePage).addPage(RedPage).start("RedMenu");
      setTimeout(() => {
        console.log("test");
        menu.stop()
      }, 5000);
    }
  }
})