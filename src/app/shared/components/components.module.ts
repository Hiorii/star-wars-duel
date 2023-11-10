import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { TabsComponent } from './tabs/tabs.component';
import { InputComponent } from './input/input.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsFormControl } from '../pipes/as-form-control.pipe';
import { SlideToogleComponent } from './slide-toogle/slide-toogle.component';

const MaterialComponents = [MatButtonModule, MatIconModule, MatCardModule, MatTabsModule, MatInputModule];
const components = [ButtonComponent, TitleComponent, CardComponent, TabsComponent, SlideToogleComponent, InputComponent];

@NgModule({
  declarations: [...components, AsFormControl],
  imports: [...MaterialComponents, CommonModule, ReactiveFormsModule, FormsModule],
  exports: [...MaterialComponents, ...components]
})
export class ComponentsModule {}
