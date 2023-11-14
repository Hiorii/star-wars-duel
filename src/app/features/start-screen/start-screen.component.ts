import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html'
})
export class StartScreenComponent {
  constructor(private router: Router) {}

  handleMenuBtnClick(menuOption: string): void {
    switch (menuOption) {
      case 'game':
        this.router.navigate(['mode']);
        break;
      case 'settings':
        this.router.navigate(['settings']);
        break;
    }
  }
}
