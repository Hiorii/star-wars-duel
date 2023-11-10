import { Component, Input, Self, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { NOOP_VALUE_ACCESSOR } from '../utilities/no-op-value-accessor';

@Component({
  selector: 'app-slide-toogle',
  templateUrl: './slide-toogle.component.html',
  styleUrls: ['./slide-toogle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useValue: NOOP_VALUE_ACCESSOR,
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class SlideToogleComponent {
  @Input() label: string;

  constructor(@Self() public ngControl: NgControl) {}
}
