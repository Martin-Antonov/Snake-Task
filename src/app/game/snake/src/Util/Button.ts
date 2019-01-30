import {GlowText} from "./GlowText";

export class Button extends Phaser.Sprite {

  text: GlowText;

  constructor(game: Phaser.Game, x: number, y: number, text: string, colorString: string, hoverColorString: string, tweenDuration: number, blur: number) {
    super(game, x, y, game.cache.getBitmapData("bmdButton"));
    this.game = game;
    this.anchor.set(0.5);
    this.tint = Phaser.Color.hexToRGB(colorString);

    // this.text = this.game.add.text(this.x, this.y, text, {font: "26px Rammetto One", fill: colorString});
    // this.text.anchor.set(0.5);
    // this.text.position = this.position;
    // this.text.setShadow(0, 0, colorString, blur);

    this.text = new GlowText(game, this.x, this.y, text, colorString, blur, this.position);

    this.inputEnabled = true;
    this.events.onInputOver.add(() => {
      this.tint = Phaser.Color.hexToRGB(hoverColorString);
      this.text.fill = hoverColorString;
      this.text.setShadow(0, 0, hoverColorString, blur);
    }, this);

    this.events.onInputOut.add(() => {
      this.tint = Phaser.Color.hexToRGB(colorString);
      this.text.fill = colorString;
      this.text.setShadow(0, 0, colorString, blur);
    }, this);
    this.game.add.tween(this).to({x: this.game.width / 2}, tweenDuration, Phaser.Easing.Quintic.Out, true);
    this.game.add.existing(this);
  }
}
