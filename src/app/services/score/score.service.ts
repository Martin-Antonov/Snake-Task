import { Injectable } from '@angular/core';
import {GameService} from "../game/game.service";
import {Game} from "../../game/snake/src/State/Game";


@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  public snakeGameState: Game;
  constructor(private gameService: GameService) {
    this.gameService.snakeGameState.subscribe((value)=>{
      this.snakeGameState = value;
    });

    let interval = setInterval(() => {
      if (this.snakeGameState && this.snakeGameState.gameOverSignal) {
        this.snakeGameState.gameOverSignal.add((score)=>{
          this.setNewHighScore(score);
        });
        console.log(this.snakeGameState.score);
        clearInterval(interval);
      }
    }, 2);

    if(!localStorage.getItem("high-score")){
      localStorage.setItem("high-score","0");
    }
  }

  getHighScore(){
    return localStorage.getItem("high-score");
  }

  getScore(){
    return this.snakeGameState.score;
  }

  setNewHighScore(newScore:number){
    let value = localStorage.getItem("high-score");
    if(parseInt(value)<newScore){
      localStorage.setItem("high-score",newScore.toString());
    }
  }

}
