import {IState} from "../Interfaces/IState";
import {IGameConfig} from "../../../../services/game-config/IGameConfig";
import {GlowText} from "../Util/GlowText";
import {ILevel} from "../../../../services/game-config/ILevel";

export class LevelSelector extends Phaser.State implements IState {
  selectLevelText: GlowText;
  bmd: Phaser.BitmapData;
  config: IGameConfig;
  levelSprites: Array<Phaser.Sprite>;

  create() {
    this.selectLevelText = new GlowText(this.game, this.game.width / 2, this.game.height * 0.15, "SELECT LEVEL",
      this.config.levelSelectorState.YELLOW, this.config.BLUR);
    this.selectLevelText.scale.set(2, 2);
    this.game.add.tween(this.selectLevelText).
    from({y: -50}, this.config.levelSelectorState.TWEEN_TEXT_DURATION, Phaser.Easing.Quintic.Out,true);
    this.levelSprites = [];
    this.createLevelSprites()
  }

  createLevelSprites() {
    let tileWidth = (this.config.WIDTH / this.config.BLOCK_DIM) * this.config.levelSelectorState.LEVEL_SCALE;
    let tileHeight = (this.config.HEIGHT / this.config.BLOCK_DIM) * this.config.levelSelectorState.LEVEL_SCALE;

    for (let i = 0; i < this.config.levels.length; i++) {
      let currentLevel = this.config.levels[i];
      this.createLevel(tileWidth, tileHeight, currentLevel, i);
    }
  }

  createLevel(width, height, level: ILevel, i: number) {
    let border = this.config.levelSelectorState.BORDER_WIDTH;
    this.bmd = this.game.make.bitmapData(width + border * 2,
      height + border * 2, "level" + i, true);
    // Background
    this.bmd.ctx.fillStyle = this.config.levelSelectorState.LEVEL_BG;
    this.bmd.ctx.fillRect(0, 0, width + border * 2, height + border * 2);
    // Border
    this.bmd.ctx.strokeStyle = this.config.levelSelectorState.LEVEL_BORDER_COLOR;
    this.bmd.ctx.strokeRect(0, 0, width + border * 2, height +border*2);
    this.bmd.ctx.stroke();
    // Rocks
    let scale = this.config.levelSelectorState.LEVEL_SCALE;
    this.bmd.ctx.fillStyle = this.config.levelSelectorState.LEVEL_ROCK_COLOR;
    level.obstacles.forEach((obstacle: { x: number, y: number }) => {
      this.bmd.ctx.fillRect(obstacle.x * scale, obstacle.y * scale, scale, scale);
    });
    // Create the sprite
    let offsetX = i % 2 === 0 ? -1 : 1;
    let offsetY = Math.floor(i / 2);
    let sprite = this.game.add.sprite(this.game.width / 2 + offsetX * width * 0.55, this.game.height * 0.4 + offsetY * height * 1.1,
      this.game.cache.getBitmapData("level" + i));
    sprite.anchor.set(0.5, 0.5);
    sprite.inputEnabled = true;
    sprite.alpha = 0;
    sprite.tint = 0xbbbbbb;
    this.game.add.tween(sprite)
      .to({alpha: 1}, this.config.levelSelectorState.TWEEN_ALPHA_DURATION, Phaser.Easing.Default, true, this.config.levelSelectorState.TWEEN_ALPHA_DURATION);
    this.levelSprites.push(sprite);
    sprite.events.onInputOver.add(() => {
      sprite.tint = 0xffffff;
    });
    sprite.events.onInputOut.add(() => {
      sprite.tint = 0xbbbbbb;
    });
    sprite.events.onInputDown.add(() => {
      this.game.add.tween(this.selectLevelText)
        .to({y: -this.game.height * 0.15}, this.config.levelSelectorState.TWEEN_TEXT_DURATION, Phaser.Easing.Quintic.In, true)
        .onComplete.add(() => {
        this.game.state.start("Game", true, false, i);
      });
      this.levelSprites.forEach((levelSprite: Phaser.Sprite) => {
        this.game.add.tween(levelSprite).to({alpha: 0}, this.config.levelSelectorState.TWEEN_ALPHA_DURATION, Phaser.Easing.Default, true);
      });
    })
  }
}
