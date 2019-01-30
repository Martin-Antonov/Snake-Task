import {IState} from "../Interfaces/IState";
import {IGameConfig} from "../../../../services/game-config/IGameConfig";
import {ILevel} from "../../../../services/game-config/ILevel";
import {SnakeModel} from "../Model/SnakeModel";
import {SnakeView} from "../View/SnakeView";
import {DIRECTION} from "../Enums/Direction";
import {Potion} from "../Model/Potion";

export class Game extends Phaser.State implements IState {
  config: IGameConfig;
  level: ILevel;
  snake: SnakeModel;
  snakeView: SnakeView;
  gameLoop: Phaser.TimerEvent;
  obstacles: Array<Phaser.Sprite>;
  potionView: Phaser.Sprite;
  potionModel: Potion;
  score: number;
  gameOverSignal: Phaser.Signal;
  inputRecentlyUp: boolean;

  init(levelIndex: number) {
    this.level = this.config.levels[levelIndex];
  }

  create() {
    this.snake = new SnakeModel(this.level.initialX, this.level.initialY, this.level.snakeBodyLength);
    this.snakeView = new SnakeView(this.game, this.snake, this.config.BLOCK_DIM, this.config.bootState.GLOW_WIDTH, "#0f0");
    this.score = 0;
    this.createKeyEvents();
    this.createObstacles();
    this.createPotion();

    this.gameLoop = this.game.time.events.loop(this.level.initialSpeed, () => {
      this.gameLoopLogic();
    });

    this.gameOverSignal = new Phaser.Signal;
  }

  gameLoopLogic() {
    this.checkGameOverCondition();
    this.snake.update(this.config.WIDTH, this.config.HEIGHT, this.config.BLOCK_DIM);
    this.snakeView.drawSnake();
    this.checkPotionEaten();
    this.checkGameOverCondition();
  }

  createPotion() {
    this.potionModel = new Potion(this.config.WIDTH / this.config.BLOCK_DIM,
      this.config.HEIGHT / this.config.BLOCK_DIM, this.level.obstacles);
    this.potionModel.calculateNewPosition(this.snake.snakeBody, this.snake.snakeHead);
    this.potionView = this.game.add.sprite(0, 0, "potion");
    this.potionView.position.x = this.potionModel.position.x * this.config.BLOCK_DIM;
    this.potionView.position.y = this.potionModel.position.y * this.config.BLOCK_DIM;
    this.potionView.width = this.config.BLOCK_DIM;
    this.potionView.height = this.config.BLOCK_DIM;
    this.potionView.animations.add("potionAnimation");
    this.potionView.animations.play("potionAnimation", 20, true);
  }

  createObstacles() {
    this.obstacles = [];
    this.level.obstacles.forEach((obstacle) => {
      this.game.add.sprite(obstacle.x * this.config.BLOCK_DIM, obstacle.y * this.config.BLOCK_DIM, this.game.cache.getBitmapData("obstacle"));
    });
  }

  createKeyEvents() {
    let upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    let downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    let leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    let rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.UP);
    this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.DOWN);
    this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.LEFT);
    this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.RIGHT);

    upKey.onDown.add(() => {
      if (this.snake.currentDirection !== DIRECTION.UP && this.snake.currentDirection !== DIRECTION.DOWN) {
        this.snake.changeDirection(DIRECTION.UP);
        this.gameLoopLogic();
      }
    });
    downKey.onDown.add(() => {
      if (this.snake.currentDirection !== DIRECTION.DOWN && this.snake.currentDirection !== DIRECTION.UP) {
        this.snake.changeDirection(DIRECTION.DOWN);
        this.gameLoopLogic();
      }
    });
    leftKey.onDown.add(() => {
      if (this.snake.currentDirection !== DIRECTION.LEFT && this.snake.currentDirection !== DIRECTION.RIGHT) {
        this.snake.changeDirection(DIRECTION.LEFT);
        this.gameLoopLogic();
      }
    });
    rightKey.onDown.add(() => {
      if (this.snake.currentDirection !== DIRECTION.RIGHT && this.snake.currentDirection !== DIRECTION.LEFT) {
        this.snake.changeDirection(DIRECTION.RIGHT);
        this.gameLoopLogic();
      }
    });

    let keys = [upKey, leftKey, downKey, rightKey];
    keys.forEach((key)=>{
      key.onHoldContext = this;
      let event;
      key.onHoldCallback = ()=>{
        this.inputRecentlyUp = false;
        event = this.game.time.events.add(500,()=>{
          if (!this.inputRecentlyUp) {
            this.gameLoop.delay = this.level.maxSpeed;
          }
          else{
            event.delay = 0;
            this.gameLoop.delay = Math.max(this.level.initialSpeed - this.score * 5, this.level.maxSpeed);
          }
        })
      };
      key.onUp.add(()=>{
        this.inputRecentlyUp = true;
        this.gameLoop.delay = Math.max(this.level.initialSpeed - this.score * 5, this.level.maxSpeed)
      })
    });
  }

  checkPotionEaten() {
    if (this.snake.snakeHead.isEqual(this.potionModel.position)) {
      this.score++;
      this.snake.drinkPotion();
      this.potionModel.calculateNewPosition(this.snake.snakeBody, this.snake.snakeHead);
      this.potionView.position.x = this.potionModel.position.x * this.config.BLOCK_DIM;
      this.potionView.position.y = this.potionModel.position.y * this.config.BLOCK_DIM;
      this.game.add.tween(this.potionView).from({alpha: 0}, this.config.bootState.TWEEN_DURATION, Phaser.Easing.Default, true);
      if (this.gameLoop.delay > this.level.maxSpeed) {
        this.gameLoop.delay -= 5;
      }
    }
  }

  checkGameOverCondition() {
    this.level.obstacles.forEach((obstacle) => {
      if (this.snake.snakeHead.x === obstacle.x && this.snake.snakeHead.y === obstacle.y) {
        this.triggerGameOver();
      }
    });
    if (this.snake.isDead) {
      this.triggerGameOver();
    }
  }

  triggerGameOver() {
    this.gameOverSignal.dispatch(this.score);
    this.game.state.start("GameOver", true, false, this.score);
  }

}
