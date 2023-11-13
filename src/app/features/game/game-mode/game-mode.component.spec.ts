import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameModeComponent } from './game-mode.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { GameModeEnum } from './models/game-mode.enum';
import { SetGameMode } from '../store/game.actions';
import { GameCardComponent } from '../game-card/game-card.component';
import { BackToMenuComponent } from '../../../shared/components/back-to-menu/back-to-menu.component';
import { MatIconModule } from '@angular/material/icon';

describe('GameModeComponent', () => {
  let component: GameModeComponent;
  let fixture: ComponentFixture<GameModeComponent>;
  let store: Store;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgxsModule.forRoot([]), MatIconModule],
      declarations: [GameModeComponent, GameCardComponent, BackToMenuComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GameModeComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch SetGameMode action and navigate on selectMode call', () => {
    const storeDispatchSpy = jest.spyOn(store, 'dispatch');
    const routerNavigateSpy = jest.spyOn(router, 'navigate');

    component.selectMode(GameModeEnum.Starship);
    expect(storeDispatchSpy).toHaveBeenCalledWith(new SetGameMode(GameModeEnum.Starship));
    expect(routerNavigateSpy).toHaveBeenCalledWith(['game']);

    storeDispatchSpy.mockClear();
    routerNavigateSpy.mockClear();

    component.selectMode(GameModeEnum.People);
    expect(storeDispatchSpy).toHaveBeenCalledWith(new SetGameMode(GameModeEnum.People));
    expect(routerNavigateSpy).toHaveBeenCalledWith(['game']);
  });

  it('should call selectMode when starship option is clicked', () => {
    const selectModeSpy = jest.spyOn(component, 'selectMode');
    const starshipButton = fixture.nativeElement.querySelector('.starshipButton');
    starshipButton.click();
    expect(selectModeSpy).toHaveBeenCalledWith(GameModeEnum.Starship);
  });

  it('should call selectMode when people option is clicked', () => {
    const selectModeSpy = jest.spyOn(component, 'selectMode');
    const peopleButton = fixture.nativeElement.querySelector('.peopleButton');
    peopleButton.click();
    expect(selectModeSpy).toHaveBeenCalledWith(GameModeEnum.People);
  });
});
