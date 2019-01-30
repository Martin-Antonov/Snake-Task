/// <reference path="../../../../node_modules/phaser-ce/typescript/phaser.d.ts" />
import {Boot} from "./src/State/Boot";
import {Game} from "./src/State/Game";
import {Menu} from "./src/State/Menu";
import {LevelSelector} from "./src/State/LevelSelector";
import {IGameConfig} from "../../services/game-config/IGameConfig";
import {IState} from "./src/Interfaces/IState";
import {GameOver} from "./src/State/GameOver";

export class Snake extends Phaser.Game {
  game:Phaser.Game;

  constructor(gameConfig:IGameConfig) {
    super(gameConfig.WIDTH, gameConfig.HEIGHT, Phaser.CANVAS, 'phaser-div', null, false, true);
    this.game = this;
    this.game.state.add('Boot', Boot, false);
    this.game.state.add('Menu', Menu, false);
    this.game.state.add('LevelSelector', LevelSelector, false);
    this.game.state.add('Game', Game, false);
    this.game.state.add('GameOver', GameOver, false);
    Object.keys(this.game.state.states).forEach((key)=>{
      (<IState>this.game.state.states[key]).config = gameConfig;
    });
    this.game.state.start('Boot');
  }
}
