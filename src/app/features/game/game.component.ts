import { AfterViewInit, ChangeDetectorRef, Component, DestroyRef, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GameState } from './store/game.state';
import { filter, Observable } from 'rxjs';
import { GameModeEnum } from './game-mode/models/game-mode.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SettingsState } from '../settings/store/settings.state';
import { ClearGameCardData, GetPeopleCardData, GetStarshipCardData } from './store/game.actions';
import { PlayerTypesEnum } from './models/player-types.enum';
import { PeopleCardModel } from './models/people-card.model';
import { StarshipCardModel } from './models/starship-card.model';
import { SizeUnitsEnum } from './game-card/models/size-units.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit {
  @ViewChild('gameBoard') gameBoard: ElementRef;
  @Select(GameState.gameMode) gameMode$: Observable<GameModeEnum | null>;
  @Select(GameState.peopleCardData) peopleCardData$: Observable<{
    player: PeopleCardModel;
    pc: PeopleCardModel;
  } | null>;
  @Select(GameState.starshipCardData) starshipCardData$: Observable<{
    player: StarshipCardModel;
    pc: StarshipCardModel;
  } | null>;

  gameMode: GameModeEnum;
  userName: string;
  destroyRef = inject(DestroyRef);
  playerPeopleCard: PeopleCardModel | null;
  playerStarshipCard: StarshipCardModel | null;
  pcPeopleCard: PeopleCardModel | null;
  pcStarshipCard: StarshipCardModel | null;
  fightCardReady: boolean = false;
  cardHeight: number;
  cardWidth: number;
  isCounterStart: boolean = false;
  counterNumber: number = 3;
  counterId: number;
  isCardFlipped: string = 'No';
  isPlayerWinner: boolean = false;
  isPcWinner: boolean = false;
  isDraw: boolean = false;
  userScore: number = 0;
  pcScore: number = 0;
  GameModeEnum = GameModeEnum;
  SizeUnitsEnum = SizeUnitsEnum;
  isFightButtonDisabled = false;

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new ClearGameCardData());
    this.listenToGameModeChange();
    this.listenToPeopleCardChange();
    this.listenToStarshipCardChange();
    this.userName = this.store.selectSnapshot(SettingsState.userName) ?? 'Player';
  }

  ngAfterViewInit(): void {
    const boardHeight = this.gameBoard?.nativeElement?.offsetHeight;
    if (boardHeight) {
      this.cardHeight = boardHeight * 0.8;
      this.cardWidth = this.cardHeight * 0.65;
    }
    this.cdr.detectChanges();
  }

  listenToGameModeChange(): void {
    this.gameMode$.pipe(takeUntilDestroyed(this.destroyRef), filter(Boolean)).subscribe((gameMode) => {
      this.gameMode = gameMode;
    });
  }

  listenToPeopleCardChange(): void {
    this.peopleCardData$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((data) => {
          if (data) {
            return !!data.player?._id || !!data.pc?._id;
          } else {
            return false;
          }
        })
      )
      .subscribe((peopleGameCard) => {
        const playerCard = peopleGameCard?.player;
        const pcCard = peopleGameCard?.pc;
        this.beginPeopleFight(playerCard, pcCard);
      });
  }

  listenToStarshipCardChange(): void {
    this.starshipCardData$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((data) => {
          if (data) {
            return !!data.player?._id || !!data.pc?._id;
          } else {
            return false;
          }
        })
      )
      .subscribe((starshipGameCard) => {
        const playerCard = starshipGameCard?.player;
        const pcCard = starshipGameCard?.pc;
        this.beginStarshipFight(playerCard, pcCard);
      });
  }

  beginPeopleFight(playerCard: PeopleCardModel | undefined, pcCard: PeopleCardModel | undefined): void {
    if (playerCard) {
      this.playerPeopleCard = playerCard;
    }

    if (pcCard) {
      this.pcPeopleCard = pcCard;
    }

    if (this.playerPeopleCard && this.pcPeopleCard) {
      this.fightCardReady = true;
      this.checkWhoIsWinner(this.playerPeopleCard, this.pcPeopleCard);
      this.startCounter();
    }
  }

  beginStarshipFight(playerCard: StarshipCardModel | undefined, pcCard: StarshipCardModel | undefined): void {
    if (playerCard) {
      this.playerStarshipCard = playerCard;
    }

    if (pcCard) {
      this.pcStarshipCard = pcCard;
    }

    if (this.playerStarshipCard && this.pcStarshipCard) {
      this.fightCardReady = true;
      this.checkWhoIsWinner(this.playerStarshipCard, this.pcStarshipCard);
      this.startCounter();
    }
  }

  startFight(): void {
    const playerAndPcIds =
      this.gameMode === GameModeEnum.People ? this.getUniqueIdCardForPlayerAndPc() : this.getUniqueIdCardStarshipForPlayerAndPc();
    this.isFightButtonDisabled = true;
    this.playerPeopleCard = null;
    this.pcPeopleCard = null;
    this.playerStarshipCard = null;
    this.pcStarshipCard = null;
    this.isPlayerWinner = false;
    this.isPcWinner = false;
    this.isDraw = false;
    switch (this.gameMode) {
      case GameModeEnum.People:
        this.store.dispatch(new GetPeopleCardData(playerAndPcIds[0], PlayerTypesEnum.player));
        this.store.dispatch(new GetPeopleCardData(playerAndPcIds[1], PlayerTypesEnum.pc));
        break;
      case GameModeEnum.Starship:
        this.store.dispatch(new GetStarshipCardData(playerAndPcIds[0], PlayerTypesEnum.player));
        this.store.dispatch(new GetStarshipCardData(playerAndPcIds[1], PlayerTypesEnum.pc));
        break;
    }
  }

  getUniqueIdCardForPlayerAndPc(): number[] {
    const nums = new Set<number>();
    while (nums.size < 2) {
      nums.add(Math.floor(Math.random() * 15) + 1);
    }
    return Array.from(nums);
  }

  getUniqueIdCardStarshipForPlayerAndPc(): number[] {
    const exclude = [1, 4, 6, 7, 8, 14, 16, 18, 19, 20];
    const nums = new Set<number>();

    while (nums.size < 2) {
      let randomNum = Math.floor(Math.random() * 22) + 2; // Generate numbers between 2 and 23
      if (!exclude.includes(randomNum)) {
        nums.add(randomNum);
      }
    }

    return Array.from(nums);
  }

  startCounter(): void {
    this.isCounterStart = true;
    this.isCardFlipped = 'No';

    this.counterId = setInterval(() => {
      this.counterNumber -= 1;
    }, 2000);

    setTimeout(() => {
      clearInterval(this.counterId);
      this.isCounterStart = false;
      this.isCardFlipped = 'Yes';
      this.counterNumber = 3;
      this.store.dispatch(new ClearGameCardData());
      if (this.isPcWinner) {
        this.pcScore += 1;
      }
      if (this.isPlayerWinner) {
        this.userScore += 1;
      }
      this.isFightButtonDisabled = false;
    }, 6000);
  }

  checkWhoIsWinner(player: PeopleCardModel | StarshipCardModel, pc: PeopleCardModel | StarshipCardModel): void {
    let playerScore: number;
    let pcScore: number;
    if (this.gameMode === GameModeEnum.People) {
      playerScore =
        (player as PeopleCardModel)?.properties.mass === 'unknown' ? 75 : parseInt((player as PeopleCardModel)?.properties.mass);
      pcScore = (pc as PeopleCardModel)?.properties.mass === 'unknown' ? 75 : parseInt((pc as PeopleCardModel)?.properties.mass);
      this.checkWinnerResult(playerScore, pcScore);
    }

    if (this.gameMode === GameModeEnum.Starship) {
      playerScore =
        (player as StarshipCardModel)?.properties.crew === 'unknown' ? 75 : parseInt((player as StarshipCardModel)?.properties.crew);
      pcScore = (pc as StarshipCardModel)?.properties.crew === 'unknown' ? 75 : parseInt((pc as StarshipCardModel)?.properties.crew);
      this.checkWinnerResult(playerScore, pcScore);
    }
  }

  checkWinnerResult(playerScore: number, pcScore: number): void {
    if (playerScore && pcScore) {
      if (playerScore > pcScore) {
        this.isPlayerWinner = true;
        this.isPcWinner = false;
        this.isDraw = false;
      } else if (pcScore > playerScore) {
        this.isPlayerWinner = false;
        this.isPcWinner = true;
        this.isDraw = false;
      } else {
        this.isPlayerWinner = false;
        this.isPcWinner = false;
        this.isDraw = true;
      }
    }
  }

  resetScore(): void {
    this.userScore = 0;
    this.pcScore = 0;
  }
}
