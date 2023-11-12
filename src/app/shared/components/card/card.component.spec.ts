import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { OrientationEnum } from './models/orientation.enum';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [CardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply "horizontal" class when orientation is horizontal', () => {
    component.orientation = OrientationEnum.horizontal;
    fixture.detectChanges();
    const cardElement = fixture.debugElement.query(By.css('mat-card'));
    expect(cardElement.nativeElement.classList.contains('horizontal')).toBeTruthy();
  });

  it('should apply the correct width and height', () => {
    component.width = '100px';
    component.height = '200px';
    fixture.detectChanges();
    const cardElement = fixture.debugElement.query(By.css('mat-card'));
    expect(cardElement.nativeElement.style.width).toBe('100px');
    expect(cardElement.nativeElement.style.height).toBe('200px');
  });
});
