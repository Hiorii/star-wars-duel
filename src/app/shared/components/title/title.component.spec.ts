import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleComponent } from './title.component';
import { By } from '@angular/platform-browser';
import { StrokeTypesEnum } from './models/stroke-types.enum';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TitleComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title text', () => {
    const text = 'Test Title';
    component.title = text;
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('h1'));
    expect(titleElement.nativeElement.textContent.trim()).toBe(text);
  });

  it('should render the title text with stroke class', () => {
    component.stroke = StrokeTypesEnum.textStrokeYellow;

    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h1'));

    expect(titleElement.nativeElement.classList.contains('text-stroke-yellow')).toBe(true);
  });
});
