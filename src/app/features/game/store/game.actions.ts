import { GameModeEnum } from '../game-mode/models/game-mode.enum';

export class SetGameMode {
  static readonly type = '[Game] SetGameMode';

  constructor(public gameMode: GameModeEnum) {}
}
