import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { StarshipCardModel } from '../../models/starship-card.model';

@Component({
  selector: 'app-starship-card-template',
  templateUrl: './starship-card-template.component.html',
  styleUrls: ['./starship-card-template.component.scss']
})
export class StarshipCardTemplateComponent implements OnInit {
  @ViewChild('cardContainer') cardContainer: ElementRef;

  @Input({ required: true }) set card(data: StarshipCardModel | null) {
    this.cardData = data;
  }

  @Input({ required: true }) set isWinner(isWinner: boolean) {
    this.isCardWinner = isWinner;
  }

  isCardWinner: boolean = false;
  cardColor: string;
  cardData: StarshipCardModel | null;

  ngOnInit(): void {
    this.getCardColors();
    this.makeRandomColor();
  }

  getCardColors(): void {
    this.cardColor = this.makeRandomColor();
  }

  makeRandomColor(): string {
    return `hsla(${Math.random() * 360}, 100%, 50%, 1)`;
  }
}
