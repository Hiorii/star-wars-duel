import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameModeEnum } from './models/game-mode.enum';
import { Store } from '@ngxs/store';
import { SetGameMode } from '../store/game.actions';

@Component({
  selector: 'app-game-mode',
  templateUrl: './game-mode.component.html',
  styleUrls: ['./game-mode.component.scss']
})
export class GameModeComponent {
  GameModeEnum = GameModeEnum;

  constructor(
    private router: Router,
    private store: Store
  ) {}

  selectMode(mode: GameModeEnum): void {
    switch (mode) {
      case GameModeEnum.Starship:
        this.store.dispatch(new SetGameMode(GameModeEnum.Starship));
        break;
      case GameModeEnum.People:
        this.store.dispatch(new SetGameMode(GameModeEnum.People));
        break;
    }
    this.router.navigate(['game']);
  }
}
