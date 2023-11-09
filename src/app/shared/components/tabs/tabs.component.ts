import {Component, Input} from '@angular/core';
import {TabsDataModel} from "./models/tabs-data.model";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  @Input({ required: true }) tabsData: TabsDataModel[] = []
}
