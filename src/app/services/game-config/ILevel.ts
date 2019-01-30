export interface ILevel {
  initialSpeed: number;
  maxSpeed: number;
  initialX: number;
  initialY: number;
  snakeBodyLength: number;
  obstacles: Array<{ x: number, y: number }>;
}
