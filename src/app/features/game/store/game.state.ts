import { GameStateModel } from './game.state.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ClearGameCardData, GetPeopleCardData, GetStarshipCardData, SetGameMode } from './game.actions';
import { HttpService } from '../../../shared/services/http.service';
import { tap } from 'rxjs';
import { PeopleCardModel } from '../models/people-card.model';
import { PlayerTypesEnum } from '../models/player-types.enum';
import { StarshipCardModel } from '../models/starship-card.model';

const defaultState = {
  name: 'game',
  defaults: {
    gameMode: null,
    peopleCardData: {
      player: null,
      pc: null
    },
    starshipCardData: {
      player: null,
      pc: null
    }
  }
};

@State<GameStateModel>(defaultState)
@Injectable()
export class GameState {
  constructor(private httpService: HttpService) {}

  @Selector()
  static gameMode(state: GameStateModel) {
    return state.gameMode;
  }

  @Selector()
  static peopleCardData(state: GameStateModel) {
    return state.peopleCardData;
  }

  @Selector()
  static starshipCardData(state: GameStateModel) {
    return state.starshipCardData;
  }

  @Action(SetGameMode)
  private setGameMode({ patchState }: StateContext<GameStateModel>, action: SetGameMode) {
    return patchState({
      gameMode: action.gameMode
    });
  }

  @Action(GetPeopleCardData)
  private getPeopleCardData(patchState: StateContext<GameStateModel>, action: GetPeopleCardData) {
    const state = patchState.getState();
    return this.httpService.getPeople(action.id).pipe(
      tap((result: { message: string; result: PeopleCardModel }) => {
        if (action.playerType === PlayerTypesEnum.player) {
          patchState.setState({
            ...state,
            peopleCardData: {
              ...state.peopleCardData,
              player: result.result
            }
          });
        } else {
          patchState.setState({
            ...state,
            peopleCardData: {
              ...state.peopleCardData,
              pc: result.result
            }
          });
        }
      })
    );
  }

  @Action(GetStarshipCardData)
  private getStarshipCardData(patchState: StateContext<GameStateModel>, action: GetStarshipCardData) {
    const state = patchState.getState();
    return this.httpService.getStarship(action.id).pipe(
      tap((result: { message: string; result: StarshipCardModel }) => {
        if (action.playerType === PlayerTypesEnum.player) {
          patchState.setState({
            ...state,
            starshipCardData: {
              ...state.starshipCardData,
              player: result.result
            }
          });
        } else {
          patchState.setState({
            ...state,
            starshipCardData: {
              ...state.starshipCardData,
              pc: result.result
            }
          });
        }
      })
    );
  }

  @Action(ClearGameCardData)
  private clearGameCardData({ patchState }: StateContext<GameStateModel>) {
    return patchState({
      peopleCardData: {
        player: null,
        pc: null
      },
      starshipCardData: {
        player: null,
        pc: null
      }
    });
  }
}
