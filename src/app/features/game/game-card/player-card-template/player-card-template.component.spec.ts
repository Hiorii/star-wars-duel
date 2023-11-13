import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerCardTemplateComponent } from './player-card-template.component';
import { GenderEnum } from '../../models/gender.enum';

describe('PlayerCardTemplateComponent', () => {
  let component: PlayerCardTemplateComponent;
  let fixture: ComponentFixture<PlayerCardTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerCardTemplateComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerCardTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate a random HSLA color', () => {
    const color = component.makeRandomColor();
    expect(color).toMatch(/hsla\(\d+(\.\d+)?, 100%, 50%, 1\)/);
  });

  it('should display card data correctly', () => {
    const mockCardData = {
      properties: {
        height: '172',
        mass: '75',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: GenderEnum.male,
        created: new Date(),
        edited: new Date(),
        name: 'Luke Skywalker',
        homeworld: 'https://swapi.dev/api/planets/1/',
        url: 'https://swapi.dev/api/people/1/'
      },
      description:
        'Luke Skywalker was a Tatooine farmboy who rose from humble beginnings to become one of the greatest Jedi the galaxy has ever known.',
      _id: '5f5fcf7b5c6d2c0017b4c1a0',
      uid: '5f5fcf7b5c6d2c0017b4c19f',
      __v: 0
    };
    component.card = mockCardData;
    fixture.detectChanges();

    const nameElement = fixture.nativeElement.querySelector('.boxTop p');
    expect(nameElement.textContent).toContain(mockCardData.properties.name);
  });
});
