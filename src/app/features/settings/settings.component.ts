import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { OrientationEnum } from '../../shared/components/card/models/orientation.enum';
import { StrokeTypesEnum } from '../../shared/components/title/models/stroke-types.enum';
import { TabsDataModel } from '../../shared/components/tabs/models/tabs-data.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SessionService } from '../../shared/services/session.service';
import { AudioService } from '../../shared/services/audio.service';
import { Store } from '@ngxs/store';
import { SetUserName } from './store/settings.actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, AfterViewInit {
  @ViewChild('userTab') userTab!: TemplateRef<any>;
  @ViewChild('generalTab') generalTab!: TemplateRef<any>;
  OrientationEnum = OrientationEnum;
  StrokeTypesEnum = StrokeTypesEnum;
  tabsData: TabsDataModel[] = [];
  userForm: FormGroup;
  currentUser: string;
  isUserEdited: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private sessionService: SessionService,
    private audioService: AudioService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadSettings();
    this.listenToMusicSettingsChange();
  }

  ngAfterViewInit(): void {
    this.tabsData = [
      {
        title: 'User',
        content: this.userTab
      },
      {
        title: 'General',
        content: this.generalTab
      }
    ];
    this.cdRef.detectChanges();
  }

  createForm(): void {
    this.userForm = this.fb.group({
      userName: [''],
      sound: [true]
    });
  }

  saveUserSettings(): void {
    this.isUserEdited = false;
    this.currentUser = this.userForm.get('userName')?.value || 'Player';
    console.log(this.currentUser);
    this.sessionService.set('userName', this.currentUser);
    this.store.dispatch(new SetUserName(this.currentUser));
  }

  loadSettings(): void {
    this.checkIfUserExists();
    this.checkMusicSettings();
  }

  checkIfUserExists(): void {
    const user = this.sessionService.get('userName') || '';
    if (!user) {
      this.isUserEdited = true;
    } else {
      this.isUserEdited = false;
      this.currentUser = user;
      this.userForm.get('userName')?.setValue(user);
      this.store.dispatch(new SetUserName(user));
    }
  }

  checkMusicSettings(): void {
    const sound = this.sessionService.get('sound');
    if (sound === 'true') {
      this.userForm.get('sound')?.setValue(true);
    } else {
      this.userForm.get('sound')?.setValue(false);
    }
  }

  editUserName(): void {
    this.isUserEdited = true;
  }

  listenToMusicSettingsChange(): void {
    const mainMusicThemePath = '/assets/files/sounds/main.mp3';
    this.userForm.get('sound')?.valueChanges.subscribe((value) => {
      this.sessionService.set('sound', value);
      if (value) {
        this.audioService.playAudio(mainMusicThemePath);
      } else {
        this.audioService.stopAudio();
      }
    });
  }
}
