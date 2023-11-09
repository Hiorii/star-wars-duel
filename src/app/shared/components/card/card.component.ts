import {Component, Input} from '@angular/core';
import {OrientationEnum} from "./models/orientation.enum";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() orientation: OrientationEnum = OrientationEnum.horizontal;
  @Input() width: string = '100%';
  @Input() height: string = '100%';
}
