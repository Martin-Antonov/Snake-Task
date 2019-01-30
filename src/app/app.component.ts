import { Component } from '@angular/core';
import {ScoreService} from "./services/score/score.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'snake-task';
  constructor(private scoreService: ScoreService){

  }

  checkScoresExist(){
    return this.scoreService && this.scoreService.snakeGameState;
  }

  getScore(){
    return this.scoreService.getScore()
  }
  getHighScore(){
    return this.scoreService.getHighScore();
  }
}
