import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCardTemplateComponent } from './player-card-template.component';

describe('PlayerCardTemplateComponent', () => {
  let component: PlayerCardTemplateComponent;
  let fixture: ComponentFixture<PlayerCardTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerCardTemplateComponent]
    });
    fixture = TestBed.createComponent(PlayerCardTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
