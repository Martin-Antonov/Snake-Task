import {IState} from "../Interfaces/IState";
import {IGameConfig} from "../../../../services/game-config/IGameConfig";
import {GlowText} from "../Util/GlowText";
import {Button} from "../Util/Button";

export class GameOver extends Phaser.State implements IState {
  config: IGameConfig;
  gameOverText: GlowText;
  scoreText: GlowText;
  score: number;
  replayButton: Button;

  init(score: number) {
    this.score = score;
  }

  create() {
    this.gameOverText =
      new GlowText(this.game, this.game.width / 2, this.game.height * 0.15, "GAME OVER", "#f00", this.config.BLUR);
    this.gameOverText.scale.set(2, 2);
    this.game.add.tween(this.gameOverText).from({y: -50}, this.config.levelSelectorState.TWEEN_TEXT_DURATION, Phaser.Easing.Quintic.Out, true);

    this.scoreText =
      new GlowText(this.game, this.game.width / 2, this.game.height * 0.3, "SCORE: " + this.score, this.config.levelSelectorState.YELLOW, this.config.BLUR);
    this.scoreText.scale.set(1.5, 1.5);
    this.game.add.tween(this.scoreText)
      .from({y: this.game.height * 0.15, alpha: 0},
        this.config.levelSelectorState.TWEEN_TEXT_DURATION, Phaser.Easing.Quintic.Out, true, this.config.levelSelectorState.TWEEN_TEXT_DURATION);
    this.replayButton = new Button(this.game, this.game.width / 2, this.game.height * 0.5, "RETRY", "#0f0", "#44ff44", 0, this.config.BLUR);
    this.game.add.tween(this.replayButton)
      .from({
        y: this.game.height * 0.3,
        alpha: 0
      }, this.config.levelSelectorState.TWEEN_TEXT_DURATION, Phaser.Easing.Quintic.Out, true, this.config.levelSelectorState.TWEEN_TEXT_DURATION*2);

    this.game.add.tween(this.replayButton.text)
      .from({
        alpha: 0
      }, this.config.levelSelectorState.TWEEN_TEXT_DURATION, Phaser.Easing.Quintic.Out, true, this.config.levelSelectorState.TWEEN_TEXT_DURATION*2);
    this.replayButton.events.onInputDown.add(() => {
      this.game.state.start("LevelSelector");
    })
  }
}
