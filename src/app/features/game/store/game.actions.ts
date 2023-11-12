import { GameModeEnum } from '../game-mode/models/game-mode.enum';
import { PlayerTypesEnum } from '../models/player-types.enum';

export class SetGameMode {
  static readonly type = '[Game] SetGameMode';

  constructor(public gameMode: GameModeEnum) {}
}

export class GetPeopleCardData {
  static readonly type = '[Game] GetPeopleCardData';

  constructor(
    public id: number,
    public playerType: PlayerTypesEnum
  ) {}
}

export class GetStarshipCardData {
  static readonly type = '[Game] GetStarshipCardData';

  constructor(
    public id: number,
    public playerType: PlayerTypesEnum
  ) {}
}

export class ClearGameCardData {
  static readonly type = '[Game] ClearGameCardData';
}
