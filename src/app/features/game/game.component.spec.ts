import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { NgxsModule, Store } from '@ngxs/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { PeopleCardModel } from './models/people-card.model';
import { StarshipCardModel } from './models/starship-card.model';
import { GameModeEnum } from './game-mode/models/game-mode.enum';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let store: Store;

  beforeEach(async () => {
    const mockStore = {
      dispatch: jest.fn(),
      selectSnapshot: jest.fn(),
      select: jest.fn(() => of(null))
    };
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([])],
      declarations: [GameComponent],
      providers: [{ provide: Store, useValue: mockStore }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch ClearGameCardData action on init', () => {
    const storeDispatchSpy = jest.spyOn(store, 'dispatch');
    expect(storeDispatchSpy).toHaveBeenCalled();
  });

  it('should start a fight when startFight is called', () => {
    const storeDispatchSpy = jest.spyOn(store, 'dispatch');
    component.startFight();
    expect(storeDispatchSpy).toHaveBeenCalled();
  });

  it('should reset scores when resetScore is called', () => {
    component.userScore = 3;
    component.pcScore = 2;
    component.resetScore();
    expect(component.userScore).toBe(0);
    expect(component.pcScore).toBe(0);
  });

  it('should begin people fight and call relevant methods', () => {
    const playerCard = { _id: '1', properties: { mass: '100' } } as PeopleCardModel;
    const pcCard = { _id: '2', properties: { mass: '90' } } as PeopleCardModel;

    const checkWhoIsWinnerSpy = jest.spyOn(component, 'checkWhoIsWinner');
    const startCounterSpy = jest.spyOn(component, 'startCounter');

    component.beginPeopleFight(playerCard, pcCard);

    expect(component.fightCardReady).toBe(true);
    expect(component.playerPeopleCard).toEqual(playerCard);
    expect(component.pcPeopleCard).toEqual(pcCard);
    expect(checkWhoIsWinnerSpy).toHaveBeenCalledWith(playerCard, pcCard);
    expect(startCounterSpy).toHaveBeenCalled();
  });

  it('should begin starship fight and call relevant methods', () => {
    const playerCard = { _id: '1', properties: { crew: '200' } } as StarshipCardModel;
    const pcCard = { _id: '2', properties: { crew: '150' } } as StarshipCardModel;
    const checkWhoIsWinnerSpy = jest.spyOn(component, 'checkWhoIsWinner');
    const startCounterSpy = jest.spyOn(component, 'startCounter');

    component.beginStarshipFight(playerCard, pcCard);

    expect(component.fightCardReady).toBe(true);
    expect(component.playerStarshipCard).toEqual(playerCard);
    expect(component.pcStarshipCard).toEqual(pcCard);
    expect(checkWhoIsWinnerSpy).toHaveBeenCalledWith(playerCard, pcCard);
    expect(startCounterSpy).toHaveBeenCalled();
  });

  it('should return unique IDs for player and PC for people', () => {
    const ids = component.getUniqueIdCardForPlayerAndPc();
    expect(ids.length).toBe(2);
    expect(ids[0]).not.toBe(ids[1]);
  });

  it('should return unique IDs within the range 1-15 for player and PC for people', () => {
    const ids = component.getUniqueIdCardForPlayerAndPc();
    expect(ids.length).toBe(2);
    expect(ids[0]).not.toBe(ids[1]);
    expect(ids[0]).toBeGreaterThanOrEqual(1);
    expect(ids[0]).toBeLessThanOrEqual(15);
    expect(ids[1]).toBeGreaterThanOrEqual(1);
    expect(ids[1]).toBeLessThanOrEqual(15);
  });

  it('should return unique IDs for player and PC for starships', () => {
    const ids = component.getUniqueIdCardStarshipForPlayerAndPc();
    expect(ids.length).toBe(2);
    expect(ids[0]).not.toBe(ids[1]);
  });

  it('should return unique IDs within the range 2-23 excluding specific values for player and PC for starships', () => {
    const excludedValues = [1, 4, 6, 7, 8, 14, 16, 18, 19, 20];
    const ids = component.getUniqueIdCardStarshipForPlayerAndPc();
    expect(ids.length).toBe(2);
    expect(ids[0]).not.toBe(ids[1]);
    expect(ids[0]).toBeGreaterThanOrEqual(2);
    expect(ids[0]).toBeLessThanOrEqual(23);
    expect(ids[1]).toBeGreaterThanOrEqual(2);
    expect(ids[1]).toBeLessThanOrEqual(23);
    expect(excludedValues).not.toContain(ids[0]);
    expect(excludedValues).not.toContain(ids[1]);
  });

  it('should start counter', (done) => {
    jest.useFakeTimers();
    component.startCounter();
    expect(component.isCounterStart).toBe(true);
    jest.advanceTimersByTime(6000);
    expect(component.isCounterStart).toBe(false);
    jest.useRealTimers();
    done();
  });

  it('should check who is the winner', () => {
    component.gameMode = GameModeEnum.People;

    component.checkWhoIsWinner({ properties: { mass: '100' } } as any, { properties: { mass: '90' } } as any);
    expect(component.isPlayerWinner).toBe(true);
    expect(component.isPcWinner).toBe(false);
    expect(component.isDraw).toBe(false);

    component.checkWhoIsWinner({ properties: { mass: '90' } } as any, { properties: { mass: '100' } } as any);
    expect(component.isPlayerWinner).toBe(false);
    expect(component.isPcWinner).toBe(true);
    expect(component.isDraw).toBe(false);

    component.checkWhoIsWinner({ properties: { mass: '100' } } as any, { properties: { mass: '100' } } as any);
    expect(component.isPlayerWinner).toBe(false);
    expect(component.isPcWinner).toBe(false);
    expect(component.isDraw).toBe(true);
  });
});
