import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Game} from "../../game/snake/src/State/Game";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _snakeGameState = new BehaviorSubject<Game>(null);
  snakeGameState = this._snakeGameState.asObservable();

  constructor() {  }

  setGameState(snakeGameState: Game){
    this._snakeGameState.next(snakeGameState);
  }
}
