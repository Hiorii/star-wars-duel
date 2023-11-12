import { GameModeEnum } from '../game-mode/models/game-mode.enum';
import { PeopleCardModel } from '../models/people-card.model';
import { StarshipCardModel } from '../models/starship-card.model';

export class GameStateModel {
  gameMode: GameModeEnum | null;
  peopleCardData: {
    player: PeopleCardModel | null;
    pc: PeopleCardModel | null;
  };
  starshipCardData: {
    player: StarshipCardModel | null;
    pc: StarshipCardModel | null;
  };
}
