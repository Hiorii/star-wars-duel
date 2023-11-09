import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './features-routing.module';
import { StartScreeModule } from './start-screen/start-screen.module';

@NgModule({
  imports: [CommonModule, FeaturesRoutingModule, StartScreeModule],
  declarations: []
})
export class FeaturesModule {}
