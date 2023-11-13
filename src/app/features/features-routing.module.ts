import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';
import { SettingsComponent } from './settings/settings.component';
import { GameModeComponent } from './game/game-mode/game-mode.component';
import { gameModeGuard } from '../shared/guards/game-mode.guard';

const routes: Routes = [
  { path: 'start', component: StartScreenComponent },
  { path: 'game', component: GameComponent, canActivate: [gameModeGuard] },
  { path: 'mode', component: GameModeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: 'start', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {}
