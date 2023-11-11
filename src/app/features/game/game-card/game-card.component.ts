import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements AfterViewInit {
  @ViewChild('cardInner') cardInner: ElementRef;
  @ViewChild('card') card: ElementRef;
  @Input() frontCard: TemplateRef<any>;
  @Input() backCard: TemplateRef<any>;
  @Input() cardHeight: number;
  @Input() cardWidth: number;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.card.nativeElement.style.height = `${this.cardHeight}px`;
    this.card.nativeElement.style.width = `${this.cardWidth}px`;
    this.cdr.detectChanges();
  }

  flipCard(): void {
    this.cardInner.nativeElement.classList.toggle('is-flipped');
  }
}
