import {Vector2} from "./Vector2";

export class Potion {
  position: Vector2;
  availablePositions: Array<Array<boolean>>;

  constructor(sceneWidth: number, sceneHeight: number, obstacles: Array<{ x: number, y: number }>) {
    this.availablePositions = [];
    this.position = new Vector2(0,0);
    this.initializeAvailablePositions(sceneWidth, sceneHeight, obstacles);
  }

  initializeAvailablePositions(width: number, height: number, obstacles: Array<{ x: number, y: number }>) {
    for (let i = 0; i < height; i++) {
      this.availablePositions[i] = [];
      for (let j = 0; j < width; j++) {
        this.availablePositions[i][j] = true;
      }
    }

    obstacles.forEach((obstacle)=>{
      this.availablePositions[obstacle.y][obstacle.x] = false;
    });
  }

  calculateNewPosition(snakeBody: Array<Vector2>, snakeHead:Vector2){
    // Encode all available positions as "x y" and splice snakeBody and snakeHead
    let availableNew:Array<string> = [];
    for (let i = 0; i < this.availablePositions.length; i++) {
      for (let j = 0; j < this.availablePositions[i].length; j++) {
        if(this.availablePositions[i][j]){
          availableNew.push(j+" "+i);
        }
      }
    }

    snakeBody.forEach((coords)=>{
      availableNew.splice(availableNew.indexOf(coords.x + " "+ coords.y),1);
    });

    availableNew.splice(availableNew.indexOf(snakeHead.x + " "+ snakeHead.y),1)

    let randomIndex = Math.floor(Math.random() * Math.floor(availableNew.length));
    let randomPositions = availableNew[randomIndex].split(" ");
    this.position.x = parseInt(randomPositions[0]);
    this.position.y = parseInt(randomPositions[1]);
  }
}
