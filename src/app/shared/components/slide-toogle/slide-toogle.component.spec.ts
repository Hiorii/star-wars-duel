import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlideToogleComponent } from './slide-toogle.component';
import { NG_CONTROL_PROVIDER } from '../../testing/ng-control-provider.stub';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AsFormControl } from '../../pipes/as-form-control.pipe';

describe('SlideToogleComponent', () => {
  let component: SlideToogleComponent;
  let fixture: ComponentFixture<SlideToogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlideToogleComponent, AsFormControl],
      imports: [ReactiveFormsModule, MatInputModule, BrowserAnimationsModule]
    })
      .overrideComponent(SlideToogleComponent, {
        add: { providers: [NG_CONTROL_PROVIDER] }
      })
      .compileComponents();
    fixture = TestBed.createComponent(SlideToogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return value', async () => {
    component.ngControl.control?.setValue(true);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.ngControl.control?.value).toBe(true);
  });
});
