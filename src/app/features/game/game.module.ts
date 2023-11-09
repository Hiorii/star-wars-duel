import { NgModule } from '@angular/core';
import { GameComponent } from './game.component';
import { GameModeComponent } from './game-mode/game-mode.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [SharedModule],
  declarations: [GameComponent, GameModeComponent]
})
export class GameModule {}
