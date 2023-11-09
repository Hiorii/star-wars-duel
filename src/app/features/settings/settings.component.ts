import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { OrientationEnum } from '../../shared/components/card/models/orientation.enum';
import { StrokeTypesEnum } from '../../shared/components/title/models/stroke-types.enum';
import { TabsDataModel } from '../../shared/components/tabs/models/tabs-data.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, AfterViewInit {
  @ViewChild('userTab') userTab!: TemplateRef<any>;
  @ViewChild('generalTab') generalTab!: TemplateRef<any>;
  OrientationEnum = OrientationEnum;
  StrokeTypesEnum = StrokeTypesEnum;
  tabsData: TabsDataModel[] = [];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.tabsData = [
      {
        title: 'User',
        content: this.userTab
      },
      {
        title: 'General',
        content: this.generalTab
      }
    ];
  }
}
