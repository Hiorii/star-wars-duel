import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the button text', () => {
    const text = 'Test Button';
    component.buttonTitle = text;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.textContent.trim()).toBe(text);
  });

  it('should emit click when enabled', () => {
    return new Promise((done) => {
      component.isDisabled = false;

      fixture.detectChanges();

      component.onBtnClick.subscribe(() => {
        expect(true).toBeTruthy();
        done(done);
      });

      const btnElement = fixture.debugElement.query(By.css('button'));
      btnElement.nativeElement.click();
    });
  });

  it('should apply primary button style when buttonType is "primary"', () => {
    component.buttonType = 'primary';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.classList.contains('primary')).toBe(true);
  });

  it('should apply secondary button style when buttonType is "secondary"', () => {
    component.buttonType = 'secondary';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.classList.contains('secondary')).toBe(true);
  });
});
