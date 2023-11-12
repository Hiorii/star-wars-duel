import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PeopleCardModel } from '../../models/people-card.model';

@Component({
  selector: 'app-player-card-template',
  templateUrl: './player-card-template.component.html',
  styleUrls: ['./player-card-template.component.scss']
})
export class PlayerCardTemplateComponent implements OnInit {
  @ViewChild('cardContainer') cardContainer: ElementRef;

  @Input({ required: true }) set card(data: PeopleCardModel | null) {
    this.cardData = data;
  }

  @Input({ required: true }) set isWinner(isWinner: boolean) {
    this.isCardWinner = isWinner;
  }

  isCardWinner: boolean = false;
  cardColor: string;
  cardData: PeopleCardModel | null;

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
