import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToMenuComponent } from './back-to-menu.component';

describe('BackToMenuComponent', () => {
  let component: BackToMenuComponent;
  let fixture: ComponentFixture<BackToMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackToMenuComponent]
    });
    fixture = TestBed.createComponent(BackToMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
