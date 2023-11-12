import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsComponent } from './tabs.component';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TabsDataModel } from './models/tabs-data.model';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: ` <ng-template #mockTemplate>Mock Content</ng-template>`
})
class MockTemplateComponent {
  @ViewChild('mockTemplate', { static: true })
  mockTemplateRef!: TemplateRef<any>;
}

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;
  let mockTemplateComponentFixture: ComponentFixture<MockTemplateComponent>;
  let mockTemplateRef: TemplateRef<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabsComponent, MockTemplateComponent],
      imports: [MatTabsModule, BrowserAnimationsModule]
    }).compileComponents();

    mockTemplateComponentFixture = TestBed.createComponent(MockTemplateComponent);
    mockTemplateRef = mockTemplateComponentFixture.componentInstance.mockTemplateRef;
    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display tabs according to tabsData input', async () => {
    const mockTabsData: TabsDataModel[] = [
      { title: 'Tab 1', content: mockTemplateRef },
      { title: 'Tab 2', content: mockTemplateRef }
    ];
    component.tabsData = mockTabsData;

    fixture.detectChanges();
    await fixture.whenStable();

    const tabLabels = fixture.nativeElement.querySelectorAll('.mdc-tab__content');
    expect(tabLabels.length).toBe(mockTabsData.length);

    mockTabsData.forEach((tab, index) => {
      expect(tabLabels[index].textContent.trim()).toContain(tab.title);
    });
  });
});
