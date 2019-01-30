
import {Button} from "../Util/Button";
import {IState} from "../Interfaces/IState";
import {IGameConfig} from "../../../../services/game-config/IGameConfig";

export class Menu extends Phaser.State implements IState{

  startButton: Phaser.Sprite;
  exitButton: Phaser.Sprite;
  config: IGameConfig;

  create() {
    this.startButton = new Button(this.game, -this.game.width * 0.1, this.game.height * 0.3, "PLAY",
      this.config.menuState.PURPLE, this.config.menuState.DARK_PURPLE, this.config.menuState.BUTTON_TWEEN_DURATION,this.config.BLUR);
    this.exitButton = new Button(this.game, this.game.width * 1.1, this.game.height * 0.6, "EXIT",
      this.config.menuState.AQUA, this.config.menuState.DARK_AQUA, this.config.menuState.BUTTON_TWEEN_DURATION, this.config.BLUR);
    this.startButton.events.onInputDown.add(() => {
      let startTween = this.game.add.tween(this.startButton).to({x: -this.game.width * 0.1},
        this.config.menuState.BUTTON_TWEEN_DURATION, Phaser.Easing.Quintic.Out, true);
      this.game.add.tween(this.exitButton).to({x: this.game.width * 1.1},
        this.config.menuState.BUTTON_TWEEN_DURATION, Phaser.Easing.Quintic.Out, true);
      startTween.onComplete.add(() => {
        this.game.state.start("LevelSelector");
      }, this);
    }, this);

    this.exitButton.events.onInputDown.add(() => {
      this.game.destroy();
    });
  }
}
