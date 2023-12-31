import { NgModule } from '@angular/core';
import { GameComponent } from './game.component';
import { GameModeComponent } from './game-mode/game-mode.component';
import { SharedModule } from '../../shared/shared.module';
import { GameModeModule } from './game-mode/game-mode.module';
import { GameCardComponent } from './game-card/game-card.component';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { GameState } from './store/game.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { GameBoardModule } from './game-board/game-board.module';
import { PlayerCardTemplateComponent } from './game-card/player-card-template/player-card-template.component';
import { StarshipCardTemplateComponent } from './game-card/starship-card-template/starship-card-template.component';

@NgModule({
  imports: [
    SharedModule,
    GameModeModule,
    CommonModule,
    NgxsModule.forFeature([GameState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    GameBoardModule
  ],
  declarations: [GameComponent, GameModeComponent, GameCardComponent, PlayerCardTemplateComponent, StarshipCardTemplateComponent]
})
export class GameModule {}
