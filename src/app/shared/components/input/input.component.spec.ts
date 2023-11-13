import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NG_CONTROL_PROVIDER } from '../../testing/ng-control-provider.stub';
import { MatInputModule } from '@angular/material/input';
import { AsFormControl } from '../../pipes/as-form-control.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent, AsFormControl],
      imports: [ReactiveFormsModule, MatInputModule, BrowserAnimationsModule]
    })
      .overrideComponent(InputComponent, {
        add: { providers: [NG_CONTROL_PROVIDER] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return value', async () => {
    component.ngControl.control?.setValue('test');

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.ngControl.control?.value).toBe('test');
  });

  it('should set the input type correctly', () => {
    const type = 'password';
    component.type = type;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.type).toBe(type);
  });

  it('should set the input name correctly', () => {
    const name = 'testName';
    component.type = name;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.name).toBe(name);
  });

  it('should prevent default behavior for "e" keydown when type is number', () => {
    component.type = 'number';
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    const event = new KeyboardEvent('keydown', { key: 'e' });
    const preventDefaultSpy = jest.fn();
    Object.defineProperty(event, 'preventDefault', { value: preventDefaultSpy });

    input.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
