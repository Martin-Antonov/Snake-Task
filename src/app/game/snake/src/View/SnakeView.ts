import {SnakeModel} from "../Model/SnakeModel";

export class SnakeView {
  game: Phaser.Game;
  snake: SnakeModel;

  sprite: Phaser.Sprite;
  blockSize: number;
  blur: number;
  color: string;
  bmd: Phaser.BitmapData;
  snakeHead: Phaser.Sprite;

  constructor(game: Phaser.Game, snake: SnakeModel, blockSize: number, blur: number, color: string) {
    this.game = game;
    this.snake = snake;
    this.blockSize = blockSize;
    this.blur = blur;
    this.color = color;
    this.sprite = this.game.add.sprite(0, 0, "");
    this.sprite.tint = Phaser.Color.hexToRGB(this.color);
    this.bmd = this.game.make.bitmapData(this.game.width, this.game.height, "snake-body");

    this.drawSnake();
  }

  drawSnake() {
    this.bmd.clear();
    this.bmd.ctx.strokeStyle = "#fff";
    this.bmd.ctx.shadowColor = "#fff";
    this.bmd.ctx.fillStyle = "#fff";
    this.bmd.ctx.shadowOffsetX = 0;
    this.bmd.ctx.shadowOffsetY = 0;
    this.bmd.ctx.shadowBlur = this.blur;
    this.bmd.ctx.lineWidth = this.blockSize;
    this.bmd.ctx.lineJoin = "round";
    this.bmd.ctx.lineCap = "round";

    for (let i = this.snake.snakeBody.length - 1; i >= 0; i--) {

      this.bmd.ctx.fillRect(this.snake.snakeBody[i].x * this.blockSize, this.snake.snakeBody[i].y * this.blockSize, this.blockSize, this.blockSize)
    }
    this.bmd.ctx.fillRect(this.snake.snakeHead.x * this.blockSize, this.snake.snakeHead.y * this.blockSize, this.blockSize, this.blockSize);

    this.sprite.loadTexture(this.bmd);
  }
}
