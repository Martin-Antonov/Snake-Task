import {ILevel} from "./ILevel";

export interface IGameConfig {
  WIDTH: number;
  HEIGHT: number;
  BLOCK_DIM: number;
  BG_COLOR: string;
  BLUR: number,
  bootState: {
    TWEEN_DURATION: number,
    GLOW_WIDTH: number,
    BORDER_WIDTH: number
  },
  menuState: {
    BUTTON_TWEEN_DURATION: number,
    PURPLE: string,
    DARK_PURPLE: string,
    AQUA: string,
    DARK_AQUA: string
  },
  levelSelectorState: {
    YELLOW: string,
    LEVEL_SCALE: number,
    BORDER_WIDTH: number,
    "LEVEL_BG": string,
    "LEVEL_ROCK_COLOR": string,
    "LEVEL_BORDER_COLOR": string,
    "TWEEN_TEXT_DURATION": number,
    "TWEEN_ALPHA_DURATION": number
  }
  gameState: {
    POTION_APPEAR_DURATION: number,
    SNAKE_COLOR: string,
  },
  levels: Array<ILevel>;
}
