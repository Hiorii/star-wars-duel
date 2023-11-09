import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { CardComponent } from './card/card.component';
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import { TabsComponent } from './tabs/tabs.component';

const MaterialComponents = [MatButtonModule, MatIconModule, MatCardModule, MatTabsModule];
const components = [ButtonComponent, TitleComponent, CardComponent, TabsComponent];

@NgModule({
  declarations: [...components, CardComponent, TabsComponent],
  imports: [...MaterialComponents, CommonModule],
  exports: [...MaterialComponents, ...components]
})
export class ComponentsModule {}
