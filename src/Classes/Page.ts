import { MessageEmbed } from "discord.js";
import { MenuButton } from "../Interfaces";

export class MenuPage {
  id: string;
  embeds: MessageEmbed[];
  content: string;
  buttons: MenuButton[];

  constructor() {
    this.id = "";
    this.embeds = [];
    this.content = "";
    this.buttons = [];
  }

  setId(id: string) {
    this.id = id;
    return this;
  }

  addEmbed(embed: MessageEmbed) {
    this.embeds.push(embed);
    return this;
  }

  setContent(content: string) {
    this.content = content;
    return this;
  }

  addButton(button: MenuButton) {
    this.buttons.push(button);
    return this;
  }
}