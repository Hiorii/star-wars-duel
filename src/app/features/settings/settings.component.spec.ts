import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SessionService } from '../../shared/services/session.service';
import { AudioService } from '../../shared/services/audio.service';
import { Store } from '@ngxs/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let mockSessionService: Partial<SessionService>;
  let mockAudioService: Partial<AudioService>;
  let mockStore: Partial<Store>;

  beforeEach(async () => {
    mockSessionService = {
      get: jest.fn((key: string) => {
        if (key === 'userName') return 'Test User';
        if (key === 'sound') return 'true';
        return null;
      }),
      set: jest.fn()
    };
    mockAudioService = {
      playAudio: jest.fn(),
      stopAudio: jest.fn()
    };
    mockStore = {
      dispatch: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: SessionService, useValue: mockSessionService },
        { provide: AudioService, useValue: mockAudioService },
        { provide: Store, useValue: mockStore }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tabs data after view init', () => {
    expect(component.tabsData.length).toBe(2);
    expect(component.tabsData[0].title).toBe('User');
    expect(component.tabsData[1].title).toBe('General');
  });

  it('should load user settings on init', () => {
    component.ngOnInit();
    expect(mockSessionService.get).toHaveBeenCalledWith('userName');
    expect(component.currentUser).toBe('Test User');
  });

  it('should enable edit mode for userName', () => {
    component.editUserName();
    expect(component.isUserEdited).toBe(true);
  });

  it('should save user settings', () => {
    const userName = 'New User';
    component.userForm.controls['userName'].setValue(userName);
    component.saveUserSettings();
    expect(mockSessionService.set).toHaveBeenCalledWith('userName', userName);
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('should handle music settings changes', () => {
    component.userForm.controls['sound'].setValue(true);
    expect(mockAudioService.playAudio).toHaveBeenCalled();
    component.userForm.controls['sound'].setValue(false);
    expect(mockAudioService.stopAudio).toHaveBeenCalled();
  });
});
