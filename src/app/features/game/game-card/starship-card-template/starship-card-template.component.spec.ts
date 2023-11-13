import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarshipCardTemplateComponent } from './starship-card-template.component';

describe('StarshipCardTemplateComponent', () => {
  let component: StarshipCardTemplateComponent;
  let fixture: ComponentFixture<StarshipCardTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarshipCardTemplateComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StarshipCardTemplateComponent);
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
        model: 'CR90 corvette',
        starship_class: 'corvette',
        manufacturer: 'Corellian Engineering Corporation',
        cost_in_credits: '3500000',
        length: '150',
        crew: '30',
        passengers: '600',
        max_atmosphering_speed: '950',
        hyperdrive_rating: '2.0',
        MGLT: '60',
        cargo_capacity: '3000000',
        consumables: '1 year',
        pilots: [],
        created: '2014-12-10T14:20:33.369000Z',
        edited: '2014-12-20T21:23:49.867000Z',
        name: 'CR90 corvette',
        url: 'https://swapi.dev/api/starships/2/'
      },
      description:
        'The CR90 corvette, commonly referred to as the Corellian corvette or the Rebel blockade runner, also known as an Alderaan cruiser, was a small, multi-purpose capital ship manufactured by Corellian Engineering Corporation. Despite its aging design and surplus availability, the ship remained popular among smugglers, pirates, and merchants throughout the galaxy, and was even used by the Galactic Empire. The CR90 had a distinguished service record, and was considered to be among the most important warships of the Rebel Alliance.',
      _id: '5f5f2f7a5c6f9c0017a5e9b1',
      uid: '2',
      __v: 0
    };
    component.card = mockCardData;
    fixture.detectChanges();

    const nameElement = fixture.nativeElement.querySelector('.boxTop p');
    expect(nameElement.textContent).toContain(mockCardData.properties.name);
  });
});
