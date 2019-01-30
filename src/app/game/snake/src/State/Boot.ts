import {IGameConfig} from "../../../../services/game-config/IGameConfig";
import {IState} from "../Interfaces/IState";

export class Boot extends Phaser.State implements IState {
  logo: Phaser.Sprite;
  bmd: Phaser.BitmapData;
  config: IGameConfig;

  preload() {
    this.game.load.image("logo", "assets/pariplay.png");
    this.game.load.spritesheet('potionView', 'assets/potionView.png', 50, 63, 7);
  }

  create() {
    this.game.stage.backgroundColor = this.config.BG_COLOR;
    this.createButtonTemplate();
    this.createObstacleTemplate();
    this.logo = this.game.add.sprite(this.game.width / 2, this.game.height * 0.3, "logo");
    this.logo.alpha = 0;
    this.logo.anchor.set(0.5, 0.5);
    this.game.add.tween(this.logo)
      .to({alpha: 1}, this.config.bootState.TWEEN_DURATION, Phaser.Easing.Default,
        true, this.config.bootState.TWEEN_DURATION)
      .onComplete.add(() => {
      this.game.add.tween(this.logo).to({alpha: 0}, this.config.bootState.TWEEN_DURATION, Phaser.Easing.Default,
        true, this.config.bootState.TWEEN_DURATION * 2)
        .onComplete.add(() => {
        this.game.state.start("Menu");
      });
    });
  }

  createButtonTemplate() {
    let totalBorder = this.config.bootState.GLOW_WIDTH + this.config.bootState.BORDER_WIDTH;
    this.bmd = this.game.make.bitmapData(this.game.width * 0.15 + 4 * (totalBorder),
      this.game.height * 0.08 + 4 * (totalBorder), "bmdButton", true);
    this.bmd.ctx.strokeStyle = "#fff";
    this.bmd.ctx.shadowColor = "#fff";
    this.bmd.ctx.shadowOffsetX = 0;
    this.bmd.ctx.shadowOffsetY = 0;
    this.bmd.ctx.shadowBlur = this.config.bootState.GLOW_WIDTH;
    this.bmd.ctx.lineWidth = this.config.bootState.BORDER_WIDTH;

    this.bmd.ctx.lineJoin = "round";
    this.bmd.ctx.strokeRect(totalBorder, totalBorder, this.bmd.width - 2 * totalBorder, this.bmd.height - 2 * totalBorder);
  }

  createObstacleTemplate(){
    this.bmd = this.game.make.bitmapData(this.config.BLOCK_DIM, this.config.BLOCK_DIM, "obstacle", true);
    this.bmd.ctx.fillStyle = "#fff";
    this.bmd.ctx.fillRect(0, 0, this.config.BLOCK_DIM, this.config.BLOCK_DIM);
  }
}
