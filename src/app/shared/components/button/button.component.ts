import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() buttonType: string = 'button';
  @Input() buttonTitle: string = 'click';
  @Input() buttonIcon: string = '';
  @Input() isDisabled: boolean = false;
  @Input() width: string = 'full';
  @Input() isFontSizeBigger: boolean = false;
  @Output() onBtnClick: EventEmitter<any> = new EventEmitter();

  onBtnClicked(event: any) {
    this.onBtnClick.emit(event);
  }
}
