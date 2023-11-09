import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  constructor(private router: Router) {
  }
  handleMenuBtnClick(menuOption: string): void {
    console.log(menuOption)
    switch(menuOption) {
      case 'game':
        this.router.navigate(['game'])
        break;
      case 'settings':
        this.router.navigate(['settings'])
        break;
    }
  }
}
