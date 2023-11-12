import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipCardTemplateComponent } from './starship-card-template.component';

describe('StarshipCardTemplateComponent', () => {
  let component: StarshipCardTemplateComponent;
  let fixture: ComponentFixture<StarshipCardTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarshipCardTemplateComponent]
    });
    fixture = TestBed.createComponent(StarshipCardTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
