import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToMenuComponent } from './back-to-menu.component';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

describe('BackToMenuComponent', () => {
  let component: BackToMenuComponent;
  let fixture: ComponentFixture<BackToMenuComponent>;
  let router: Router;

  beforeEach(async () => {
    const routerMock = {
      navigate: jest.fn()
    };
    await TestBed.configureTestingModule({
      declarations: [BackToMenuComponent],
      imports: [MatIconModule],
      providers: [{ provide: Router, useValue: routerMock }]
    }).compileComponents();
    fixture = TestBed.createComponent(BackToMenuComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /start when moveToMenu is called', () => {
    component.moveToMenu();
    expect(router.navigate).toHaveBeenCalledWith(['/start']);
  });
});
