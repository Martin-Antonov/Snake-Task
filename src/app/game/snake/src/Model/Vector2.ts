export class Vector2 {
  x: number;
  y: number;

  constructor(x:number, y:number) {
    this.x = x;
    this.y = y;
  }

  add(direction: Vector2){
    this.x += direction.x;
    this.y += direction.y;
  }

  isEqual(position: Vector2){
    return this.x === position.x && this.y === position.y;
  }
}
