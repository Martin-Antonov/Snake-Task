import {Vector2} from "./Vector2";
import {DIRECTION} from "../Enums/Direction";

export class SnakeModel {
  snakeHead: Vector2;
  snakeBody: Array<Vector2>;
  currentDirection: Vector2;
  isDead: boolean;

  constructor(startX: number, startY: number, bodyLength: number) {
    this.snakeHead = new Vector2(startX, startY);
    this.snakeBody = [];
    for (let i = 1; i <= bodyLength; i++) {
      this.snakeBody.push(new Vector2(this.snakeHead.x - i, this.snakeHead.y))
    }
    this.currentDirection = DIRECTION.RIGHT;
    this.isDead = false;
  }

  update(sceneWidth: number, sceneHeight: number, blockSize: number) {
    for (let i = this.snakeBody.length - 1; i >= 1; i--) {
      this.snakeBody[i].x = this.snakeBody[i - 1].x;
      this.snakeBody[i].y = this.snakeBody[i - 1].y;
    }
    this.snakeBody[0].x = this.snakeHead.x;
    this.snakeBody[0].y = this.snakeHead.y;
    this.moveSnakeHead(sceneWidth, sceneHeight, blockSize);

    this.checkIfSnakeDead();
  }

  changeDirection(newDirection: Vector2) {
    this.currentDirection = newDirection;
  }

  moveSnakeHead(width: number, height: number, blockSize) {
    this.snakeHead.add(this.currentDirection);
    if (this.snakeHead.x >= width / blockSize) {
      this.snakeHead.x = 0;
    }
    else if (this.snakeHead.x < 0) {
      this.snakeHead.x = width / blockSize;
    }
    if (this.snakeHead.y >= height / blockSize) {
      this.snakeHead.y = 0;
    }
    else if (this.snakeHead.y < 0) {
      this.snakeHead.y = height / blockSize;
    }
  }

  checkIfSnakeDead() {
    for (let i = 0; i < this.snakeBody.length - 1; i++) {
      if (this.snakeHead.isEqual(this.snakeBody[i])) {
        this.isDead = true;
        return;
      }
    }
  }

  drinkPotion() {
    let snakeTail = this.snakeBody[this.snakeBody.length - 1];
    let snakePreviousElement = this.snakeBody[this.snakeBody.length - 2];
    let direction = new Vector2(snakeTail.x - snakePreviousElement.x, snakeTail.y - snakePreviousElement.y);
    this.snakeBody.push(new Vector2(snakeTail.x+direction.x, snakeTail.y+direction.y));
  }
}
