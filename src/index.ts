import { MessageEmbed, MessageButtonStyleResolvable, EmojiIdentifierResolvable, CommandInteraction, MessageActionRow, MessageButton, ButtonInteraction, Collector, MessageCollector, InteractionCollector, Interaction } from "discord.js";

interface MenuButton {
    label: String
    style: MessageButtonStyleResolvable
    target: String
    emoji: EmojiIdentifierResolvable
    url: String
}

interface MenuPage {
    id: String
    embeds: Array<MessageEmbed>
    content: String
    buttons: Array<MenuButton>
}

class MenuButton {

    label: String
    style: MessageButtonStyleResolvable
    target: String
    emoji: EmojiIdentifierResolvable
    url: String
    id: String

    constructor() {
        this.label = "";
        this.style = "PRIMARY";
        this.target = "";
        this.emoji = "";
        this.url = "";
        this.id = "";
    }

    setLabel(label: String) {
        this.label = label;
        return this;
    }

    setStyle(style: MessageButtonStyleResolvable) {
        this.style = style;
        return this;
    }

    setTarget(target: String) {
        this.target = target;
        return this;
    }

    setEmoji(emoji: EmojiIdentifierResolvable) {
        this.emoji = emoji;
        return this;
    }

    setURL(url: string) {
        this.url = url;
        return this;
    }

    setId(id: String) {
        this.id = id;
        return this;
    }
}

class Menu {
    pages: Array<MenuPage>
    currentCollector: any
    interaction: CommandInteraction

    constructor(interaction: CommandInteraction) {
        this.pages = []
        this.interaction = interaction;
        this.currentCollector = {};
    }

    addPage(page: MenuPage) {
        this.pages.push(page);
        return {pages:this.pages, interaction:this.interaction, currentCollector:this.currentCollector, start:this.start, stop:this.stop, addPage: this.addPage, doCollector: this.doCollector};
    }

    start(id: String) {
        const page = id ? this.pages.find(page => page.id === id) : this.pages[0];
        displayPage(this.interaction, page).then(()=> {
            this.doCollector(page)
        })
        return {stop:this.stop, currentCollector:this.currentCollector, doCollector: this.doCollector};
    }

    stop() {
        function isEmpty(obj) {
            for(var prop in obj) {
              if(Object.prototype.hasOwnProperty.call(obj, prop)) {
                return false;
              }
            }
            return JSON.stringify(obj) === JSON.stringify({});
          }
        if (!isEmpty(this.currentCollector)) {
            this.currentCollector.stop();
            this.currentCollector = {};
            return;
        } 
    }

    doCollector(page?:MenuPage){ 
        const filter = i => i.user.id === this.interaction.user.id && i.customId.split('.')[1] === this.interaction.user.id;
        const collector = this.interaction.channel?.createMessageComponentCollector({ filter, time: 60000, max: 1 })
        this.currentCollector = collector
        collector?.on('collect', async i => {
            const id = i.customId.split('.')[0]
            const target = page?.buttons.find(button => button.id === id )?.target;
            const newPage = this.pages.find(page => page.id === target);
            await displayPage(this.interaction, newPage, i);
            this.currentCollector = {};
            this.doCollector(newPage);
        });
        return this;
    }
}

function displayPage(interaction:CommandInteraction, page?: MenuPage, iButton?:ButtonInteraction) {
    return new Promise(async (resolve, reject) => {
        const content = page?.content || "."
        const buttons = page?.buttons || []
        const raw = new MessageActionRow()
        for (let i = 0; i < buttons.length; i++) { raw.addComponents(new MessageButton().setCustomId(`${buttons[i].id}.${interaction.user.id}`).setLabel(`${buttons[i].label}`).setStyle(buttons[i].style).setEmoji(buttons[i].emoji).setURL(`${buttons[i].url}`),) }
        if(iButton){
            const newInteraction = iButton.update({ embeds: page?.embeds, content: `${content}`, components: [raw] });
            resolve(newInteraction)
        }else{
        if (interaction.replied) {
            const newInteraction = await interaction.editReply({ embeds: page?.embeds, content: `${content}`, components: [raw] })
            resolve(newInteraction)
        } else {
            const newInteraction = await interaction.reply({ embeds: page?.embeds, content: `${content}`, components: [raw] })
            resolve(newInteraction)
        }
        }
    })
}

class MenuPage {

    id: String
    embeds: Array<MessageEmbed>
    content: String
    buttons: Array<MenuButton>

    constructor() {
        this.id = "";
        this.embeds = [];
        this.content = "";
        this.buttons = [];
    }

    setId(id: String) {
        this.id = id;
        return this;
    }

    addEmbed(embed: MessageEmbed) {
        this.embeds.push(embed);
        return this;
    }

    setContent(content: String) {
        this.content = content;
        return this;
    }

    addButton(button: MenuButton) {
        this.buttons.push(button);
        return this;
    }
}
module.exports = { MenuPage, MenuButton, Menu };