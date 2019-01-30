import {Component, ElementRef, OnInit} from '@angular/core';
import {Snake} from "./snake/Snake";
import {GameConfigService} from "../services/game-config/game-config.service";
import {GameService} from "../services/game/game.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Phaser.Game;

  constructor(private el: ElementRef, private gameConfigService: GameConfigService, private gameService: GameService) {
    setTimeout(() => {
      this.game = new Snake(this.gameConfigService.gameConfig);
    }, 500);
    let interval = setInterval(() => {
      if (this.game && this.game.state && this.game.state.states.Game) {
        this.gameService.setGameState(this.game.state.states.Game);
        clearInterval(interval);
      }
    }, 100);
  }

  ngOnInit() {

  }

}
