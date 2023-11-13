import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AudioService } from './shared/services/audio.service';
import { SessionService } from './shared/services/session.service';
import { SetUserName } from './features/settings/store/settings.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  title = 'star-wars-duel';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private audioService: AudioService,
    private sessionService: SessionService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initApp();
  }

  private initApp(): void {
    this.generateBackgroundStars();
    this.handleMusic();
    this.checkIfUserExists();
  }

  checkIfUserExists(): void {
    const user = this.sessionService.get('userName') || '';
    if (!user) return;

    this.store.dispatch(new SetUserName(user));
  }

  generateBackgroundStars(): void {
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
      const y = window.innerWidth;
      const x = window.innerHeight;
      const randomX = Math.floor(Math.random() * x);
      const randomY = Math.floor(Math.random() * y);
      return [randomX, randomY];
    }
  }

  handleMusic(): void {
    const sound = this.sessionService.get('sound');
    const mainMusicThemePath = '/assets/files/sounds/main.mp3';
    if (sound === 'true') {
      this.audioService.playAudio(mainMusicThemePath);
    } else {
      this.audioService.stopAudio();
    }
  }
}
