import {
  CommandInteraction,
  EmojiIdentifierResolvable,
  MessageButtonStyleResolvable,
} from 'discord.js';
import {Menu} from './Classes/Menu';
import {MenuPage} from './Classes/Page';
import {MenuSelectPage} from './Classes/SelectPage';

// TODO : Handle errors

export type pagesType = MenuPage|MenuSelectPage;

export type SingleButton = {
  label: string;
  style: MessageButtonStyleResolvable;
  target: string;
  emoji?: EmojiIdentifierResolvable;
  url?: string;
}

export type MenuButton = {
  label: string;
  style: MessageButtonStyleResolvable;
  target: string|((
    page:MenuPage|MenuSelectPage, interaction:CommandInteraction, menu:Menu
    ) => void);
  id:string;
  emoji?: EmojiIdentifierResolvable;
  url?: string;
}

export type SelectChoice = {
  target: string|((
    page:MenuPage|MenuSelectPage, interaction:CommandInteraction, menu:Menu
    ) => void);
  label: string;
  description?: string;
  emoji?: EmojiIdentifierResolvable;
}

export type MenuSelectChoice = {
  target: string|((
    page:MenuPage|MenuSelectPage, interaction:CommandInteraction, menu:Menu
    ) => void);
  value: string;
  label: string;
  description?: string;
  emoji?: EmojiIdentifierResolvable;
}

export {Menu, MenuPage, MenuSelectPage};
