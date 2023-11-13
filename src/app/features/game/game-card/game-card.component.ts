import { AfterContentChecked, Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { SizeUnitsEnum } from './models/size-units.enum';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements AfterContentChecked {
  @ViewChild('cardInner') cardInner: ElementRef;
  @ViewChild('card') card: ElementRef;
  @Input() frontCard: TemplateRef<any>;
  @Input() backCard: TemplateRef<any>;
  @Input() widthUnit: SizeUnitsEnum = SizeUnitsEnum.px;
  @Input() heightUnit: SizeUnitsEnum = SizeUnitsEnum.px;

  @Input() set isCardFlipped(isFlipped: string) {
    if (isFlipped) {
      this.flipCard();
    }
  }

  @Input() set cardHeight(cardHeight: number) {
    if (cardHeight) {
      this._cardHeight = cardHeight;
    }
  }

  @Input() set cardWidth(cardWidth: number) {
    if (cardWidth) {
      this._cardWidth = cardWidth;
    }
  }

  _cardHeight: number;
  _cardWidth: number;

  ngAfterContentChecked(): void {
    if (this.card) {
      if (this._cardHeight) this.card.nativeElement.style.height = `${this._cardHeight}${this.heightUnit}`;
      if (this._cardWidth) this.card.nativeElement.style.width = `${this._cardWidth}${this.widthUnit}`;
    }
  }

  flipCard(): void {
    this.cardInner?.nativeElement.classList.toggle('is-flipped');
  }
}
