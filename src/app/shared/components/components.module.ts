import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

const MaterialComponents = [MatButtonModule, MatIconModule];
const components = [ButtonComponent];

@NgModule({
  declarations: [...components],
  imports: [...MaterialComponents, CommonModule],
  exports: [...MaterialComponents, ...components]
})
export class ComponentsModule {}
