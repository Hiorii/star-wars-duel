import { GameStateModel } from './game.state.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetGameMode } from './game.actions';

const defaultState = {
  name: 'game',
  defaults: {
    gameMode: null
  }
};

@State<GameStateModel>(defaultState)
@Injectable()
export class GameState {
  @Selector()
  static gameMode(state: GameStateModel) {
    return state.gameMode;
  }

  @Action(SetGameMode)
  private setGameMode({ patchState }: StateContext<GameStateModel>, action: SetGameMode) {
    return patchState({
      gameMode: action.gameMode
    });
  }
}
