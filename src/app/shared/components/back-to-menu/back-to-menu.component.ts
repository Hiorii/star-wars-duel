import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-to-menu',
  templateUrl: './back-to-menu.component.html',
  styleUrls: ['./back-to-menu.component.scss']
})
export class BackToMenuComponent {
  constructor(private router: Router) {}

  moveToMenu(): void {
    this.router.navigate(['/start']);
  }
}
