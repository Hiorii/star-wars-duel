import { TestBed } from '@angular/core/testing';
import { AudioService } from './audio.service';

describe('AudioService', () => {
  let service: AudioService;
  let mockAudio: any;

  beforeEach(async () => {
    mockAudio = {
      src: '',
      load: jest.fn(),
      loop: false,
      play: jest.fn().mockResolvedValue(undefined),
      pause: jest.fn(),
      catch: jest.fn()
    };

    jest.spyOn(window, 'Audio').mockImplementation(() => mockAudio);
    await TestBed.configureTestingModule({}).compileComponents();
    service = TestBed.inject(AudioService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should set the audio source and play the audio', () => {
    const audioPath = 'path/to/audio.mp3';
    service.playAudio(audioPath);

    expect(mockAudio.src).toBe(audioPath);
    expect(mockAudio.load).toHaveBeenCalled();
    expect(mockAudio.loop).toBe(true);
    expect(mockAudio.play).toHaveBeenCalled();
  });

  it('should pause the audio', () => {
    service.stopAudio();
    expect(mockAudio.pause).toHaveBeenCalled();
  });
});
