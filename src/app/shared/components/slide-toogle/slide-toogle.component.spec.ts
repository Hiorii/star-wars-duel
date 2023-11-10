import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideToogleComponent } from './slide-toogle.component';

describe('SlideToogleComponent', () => {
  let component: SlideToogleComponent;
  let fixture: ComponentFixture<SlideToogleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlideToogleComponent]
    });
    fixture = TestBed.createComponent(SlideToogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
