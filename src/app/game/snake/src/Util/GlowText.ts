export class GlowText extends Phaser.Text {

  constructor(game: Phaser.Game, x: number, y: number, text: string, color: string, blur: number, position?: Phaser.Point) {
    super(game, x, y, text);
    this.setStyle({font: "26px Rammetto One", fill: color});
    this.anchor.set(0.5);
    this.setShadow(0, 0, color, blur);
    if (position) {
      this.position = position;
    }
    this.game.add.existing(this);
  }
}
