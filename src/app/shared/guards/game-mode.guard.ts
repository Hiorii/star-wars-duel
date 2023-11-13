import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { GameState } from '../../features/game/store/game.state';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameModeService {
  @Select(GameState.gameMode) gameMode$: Observable<boolean>;

  constructor(private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.gameMode$.pipe(map((gameMode) => (gameMode ? true : this.router.createUrlTree(['/mode']))));
  }
}

export const gameModeGuard: CanActivateFn = () => {
  const gameModeService = inject(GameModeService);
  return gameModeService.canActivate();
};
