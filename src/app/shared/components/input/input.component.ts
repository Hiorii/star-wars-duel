import { Component, Input, Self, ViewEncapsulation } from '@angular/core';
import { NOOP_VALUE_ACCESSOR } from '../utilities/no-op-value-accessor';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useValue: NOOP_VALUE_ACCESSOR,
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class InputComponent {
  @Input() label: string = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() name = '';

  constructor(@Self() public ngControl: NgControl) {}

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'e' && this.type === 'number') {
      event.preventDefault();
      return false;
    }

    return true;
  }
}
