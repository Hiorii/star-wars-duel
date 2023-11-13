import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameCardComponent } from './game-card.component';
import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  template: `
    <ng-template #testTemplate>Test Content</ng-template>
    <app-game-card [frontCard]="testTemplate" [backCard]="testTemplate"></app-game-card>
  `
})
class TestHostComponent {
  @ViewChild('testTemplate', { static: true }) testTemplate: TemplateRef<any>;
}

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameCardComponent, TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
    component = fixture.debugElement.children[0].componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle flip class on flipCard call', () => {
    const cardInnerElement = component.cardInner.nativeElement;
    component.flipCard();
    expect(cardInnerElement.classList.contains('is-flipped')).toBeTruthy();

    component.flipCard();
    expect(cardInnerElement.classList.contains('is-flipped')).toBeFalsy();
  });

  it('should set dynamic styles based on inputs', () => {
    const height = 200;
    const width = 100;
    component.cardHeight = height;
    component.cardWidth = width;
    fixture.detectChanges();

    const cardElement = component.card.nativeElement;
    expect(cardElement.style.height).toBe(`${height}px`);
    expect(cardElement.style.width).toBe(`${width}px`);
  });

  it('should project front and back card content', () => {
    fixture.detectChanges();
    const frontCardContent = fixture.nativeElement.querySelector('.card__face--front').textContent;
    const backCardContent = fixture.nativeElement.querySelector('.card__face--back').textContent;
    expect(frontCardContent).toContain('Test Content');
    expect(backCardContent).toContain('Test Content');
  });
});
