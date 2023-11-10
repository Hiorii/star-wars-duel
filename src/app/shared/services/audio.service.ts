import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio = new Audio();

  playAudio(audioPath: string): void {
    this.audio.src = audioPath;
    this.audio.load();
    this.audio.loop = true;
    this.audio.play().catch((err) => console.error('Audio playback error:', err));
  }

  stopAudio(): void {
    this.audio.pause();
  }
}
