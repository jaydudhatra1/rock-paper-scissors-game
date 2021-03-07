import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EXCEPTIONS, GAME_MODE, GAME_STATE, GAME_TYPE, PLAYERS, PLAYER_STATE } from "../constants/enums";
// import { game, rock_scissors_paper_states, rocker_paper_scissors_lizard_spock_states } from "../../../../cli-game/dist/obj/Main";
import { game, rock_scissors_paper_states, rocker_paper_scissors_lizard_spock_states } from "../../../../cli-game/dist/game-cli";
import { Output } from "../constants/types";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"]
})
export class PlayerComponent implements OnInit {
  public type: GAME_TYPE = GAME_TYPE.RPSLS;
  public GAME_TYPE = GAME_TYPE;
  public GAME_MODE = GAME_MODE;
  public PLAYERS = PLAYERS;
  public isStarted = false;
  public playerState = PLAYER_STATE.START_GAME;
  public timer;
  public mode: GAME_MODE;
  public output: Output;

  private timeout = 5000;
  private gameInstance;
  private interval;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {

    this.route.queryParams.subscribe(params => {
      this.mode = params.mode;
    });
  }

  ngOnInit(): void {
    console.log(this.mode);
    this.timer = this.timeout / 1000;
  }

  public start(): void {
    this.isStarted = true;
    this.output = null;

    this.gameInstance = new game({
      timeout: this.timeout,
      mode: this.mode,
      stateRules: this.getGameRules()
    });

    this.startTimer();

    this.gameInstance
      .start()
      .then(this.onOutput.bind(this))
      .catch(this.onException.bind(this))
      .finally(() => {
        this.isStarted = false;
        this.stopTimer();
      });
  }

  public chooseGesture(gesture: string): void {
    this.gameInstance.input(gesture);
  }

  public getButtonText(): string {
    switch (this.playerState) {
      case PLAYER_STATE.START_GAME:
        return "Start Game";
      case PLAYER_STATE.RETRY:
        return "Retry";
      case PLAYER_STATE.PLAY_AGAIN:
        return "Play Again";
    }
  }

  public exit(): void {
    this.router.navigateByUrl("");
  }

  public isButtonDisabled(player: PLAYERS, buttonText: string): boolean {
    if (this.isStarted && player === PLAYERS.PLAYER_2) {
      return true;
    }

    if (this.output && !this.isStarted) {
      if (player === PLAYERS.PLAYER_1 && this.output.player1Response === buttonText) {
        return false;
      }

      if (player === PLAYERS.PLAYER_2 && this.output.player2Response === buttonText) {
        return false;
      }
    }

    if (!this.isStarted) {
      return true;
    }

    return false;
  }

  public get isDraw(): boolean {
    return this.output && this.output.state === GAME_STATE.TIE;
  }

  public get isPlayer1Won(): boolean {
    return this.output && this.output.state === GAME_STATE.WIN;
  }

  public get isPlayer2Won(): boolean {
    return this.output && this.output.state === GAME_STATE.LOSE;
  }

  public get message(): string {
    return this.output && this.output.message;
  }

  public get winningColor(): string {
    if (this.output) {
      const green = "green";
      const red = "red";
      const grey = "grey";

      if (this.output.state === GAME_STATE.TIE) {
        return "grey";
      }

      switch (this.mode) {
        case GAME_MODE.PvC:
          return this.output.state === GAME_STATE.WIN ? green : red;
        case GAME_MODE.CvC:
          return green;
      }
    }

    return "";
  }

  private onOutput(output: Output): void {
    this.playerState = PLAYER_STATE.PLAY_AGAIN;
    this.output = output;
  }

  private onException(exception: EXCEPTIONS): void{
    alert(exception);
    this.playerState = PLAYER_STATE.RETRY;
  }

  private getGameRules(): object {
    switch (this.type) {
      case GAME_TYPE.RPS:
        return rock_scissors_paper_states;
      case GAME_TYPE.RPSLS:
        return rocker_paper_scissors_lizard_spock_states;
    }
  }

  private startTimer(): void {
    if (this.interval) {
      this.stopTimer();
    }

    this.timer = this.timeout / 1000;
    const updateTimerInterval = 1000;

    this.interval = setInterval(() => {
      this.timer = this.timer > 0 ? this.timer - (updateTimerInterval / 1000) : 0;
    }, updateTimerInterval);
  }

  private stopTimer(): void {
    clearInterval(this.interval);
    this.interval = null;
  }
}
