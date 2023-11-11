import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameBoardComponent } from './game-board.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [GameBoardComponent],
  exports: [GameBoardComponent],
  imports: [CommonModule, SharedModule]
})
export class GameBoardModule {}
