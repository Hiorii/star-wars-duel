import {Component, Input} from '@angular/core';
import {StrokeTypesEnum} from "./models/stroke-types.enum";

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {
  @Input({ required: true }) title: string = ''
  @Input() stroke: StrokeTypesEnum = StrokeTypesEnum.textStrokeWhite
}
