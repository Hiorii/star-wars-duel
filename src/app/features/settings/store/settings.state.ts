import { SettingsStateModel } from './settings.state.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetUserName } from './settings.actions';

const defaultState = {
  name: 'settings',
  defaults: {
    userName: undefined
  }
};

@State<SettingsStateModel>(defaultState)
@Injectable()
export class SettingsState {
  @Selector()
  static userName(state: SettingsStateModel) {
    return state.userName;
  }

  @Action(SetUserName)
  private setUserName({ patchState }: StateContext<SettingsStateModel>, action: SetUserName) {
    return patchState({
      userName: action.userName
    });
  }
}
