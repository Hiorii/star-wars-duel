import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GameState } from './store/game.state';
import { filter, Observable } from 'rxjs';
import { GameModeEnum } from './game-mode/models/game-mode.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SettingsState } from '../settings/store/settings.state';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @Select(GameState.gameMode) gameMode$: Observable<GameModeEnum | null>;

  gameMode: GameModeEnum;
  userName: string;
  destroyRef = inject(DestroyRef);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.listenToGameModeChange();
    this.userName = this.store.selectSnapshot(SettingsState.userName) ?? '';
  }

  listenToGameModeChange(): void {
    this.gameMode$.pipe(takeUntilDestroyed(this.destroyRef), filter(Boolean)).subscribe((gameMode) => {
      this.gameMode = gameMode;
    });
  }

  startFight(): void {}
}
