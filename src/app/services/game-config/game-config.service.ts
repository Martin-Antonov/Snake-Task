import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IGameConfig} from "./IGameConfig";


@Injectable({
  providedIn: 'root'
})
export class GameConfigService {
  gameConfig: IGameConfig;

  constructor(private http: HttpClient) {
    this.http.get<IGameConfig>('./assets/game-config.json').subscribe(value => {
      this.gameConfig = value;
    });
  }
}
