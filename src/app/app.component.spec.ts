import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AudioService } from './shared/services/audio.service';
import { SessionService } from './shared/services/session.service';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { SettingsState } from './features/settings/store/settings.state';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockAudioService: Partial<AudioService>;
  let mockSessionService: Partial<SessionService>;

  beforeEach(async () => {
    mockAudioService = {
      playAudio: jest.fn(),
      stopAudio: jest.fn()
    };
    mockSessionService = {
      get: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgxsRouterPluginModule.forRoot(), NgxsModule.forRoot([SettingsState], { developmentMode: true })],
      declarations: [AppComponent],
      providers: [
        { provide: AudioService, useValue: mockAudioService },
        { provide: SessionService, useValue: mockSessionService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should play audio when session sound is true', () => {
    (mockSessionService.get as jest.Mock).mockReturnValue('true');
    fixture.detectChanges();
    expect(mockAudioService.playAudio).toHaveBeenCalled();
  });

  it('should stop audio when session sound is false', () => {
    (mockSessionService.get as jest.Mock).mockReturnValue('false');
    fixture.detectChanges();
    expect(mockAudioService.stopAudio).toHaveBeenCalled();
  });
});
