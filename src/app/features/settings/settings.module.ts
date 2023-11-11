import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { SettingsState } from './store/settings.state';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([SettingsState]),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ]
})
export class SettingsModule {}
