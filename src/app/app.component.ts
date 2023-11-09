import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  title = 'star-wars-duel';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.generateBackgroundStars();
  }

  private generateBackgroundStars(): void {
    const numStars = 100;

    for (let i = 0; i < numStars; i++) {
      let star = this.document.createElement('div');
      star.className = `star star-${Math.floor(Math.random() * 6) + 1}`;
      const xy = getRandomPosition();
      star.style.top = xy[0] + 'px';
      star.style.left = xy[1] + 'px';
      this.document.body.append(star);
    }

    function getRandomPosition() {
      const x = window.innerWidth;
      const y = window.innerHeight;
      const randomX = Math.floor(Math.random() * x);
      const randomY = Math.floor(Math.random() * y);
      return [randomX, randomY];
    }
  }
}
