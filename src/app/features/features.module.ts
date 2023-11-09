import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './features-routing.module';
import { StartScreeModule } from './start-screen/start-screen.module';
import {SettingsModule} from "./settings/settings.module";
import {GameModule} from "./game/game.module";

@NgModule({
  imports: [CommonModule, FeaturesRoutingModule, StartScreeModule, SettingsModule, GameModule],
  declarations: []
})
export class FeaturesModule {}
