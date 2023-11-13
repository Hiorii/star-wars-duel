import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { StartScreenComponent } from './start-screen.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

describe('StartScreenComponent', () => {
  let component: StartScreenComponent;
  let fixture: ComponentFixture<StartScreenComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartScreenComponent, TitleComponent, ButtonComponent],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(StartScreenComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to game mode when Start Game button is clicked', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.handleMenuBtnClick('game');
    expect(navigateSpy).toHaveBeenCalledWith(['mode']);
  });

  it('should navigate to settings when Settings button is clicked', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.handleMenuBtnClick('settings');
    expect(navigateSpy).toHaveBeenCalledWith(['settings']);
  });
});
