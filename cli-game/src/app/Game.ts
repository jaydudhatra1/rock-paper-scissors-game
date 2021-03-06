import { Config, State } from "./Config";
import { GAME_MODE, GAME_STATE } from "./Enums";
import { InputScanner } from "./InputScanner";
import { Util } from "./Util";

export class Game {
    public gamePromise: Promise<any>;
    private config: Config;
    private util: Util;
    private resolveFn: Function;

    constructor(config?: Config) {
        this.gamePromise = new Promise<any>((resolve, reject) => {
            this.resolveFn = resolve;
        });
        this.config = config;
        this.util = new Util();
        this.processStates();
    }

    public start(): void {
        if (!this.config.mode) {
            this.util.fetchAndValidate(
                this,
                "Please select game mode. \n\tPress 1 for Player vs Computer \n\tPress 2 for Computer vs Computer\n",
                this.validateGameMode.bind(this)
            )
                .then(this.start.bind(this))
                .catch(this.start.bind(this));
        } else {
            switch(this.config.mode) {
                case GAME_MODE.PvC:
                    this.startPlayerVsComputerGame();
                    break;
                case GAME_MODE.CvC:
                    this.startComputerVsComputerGame();
                    break;
            }
        }
    }

    private validateGameMode(resolve: Function, reject: Function, input: string): void {
        const mode: GAME_MODE = parseInt(input);
        switch(mode) {
            case GAME_MODE.PvC:
            case GAME_MODE.CvC:
                this.config.mode = mode;
                resolve(mode);
                break;
            default:
                console.error("Please enter valid Game Mode.");
                reject();
        }
    }

    private validatePlayerInput(resolve: Function, reject: Function, input: string): void {
        if (!this.config.states.includes(input)) {
            console.log("Please enter valid input.");
            reject();
        } else {
            console.log("\n");
            console.log("you have chosen: " + input);

            const computerInput = this.getRandomState();
            console.log("Computer 1 has chosen: " + computerInput);
            this.evaluateResult(input, computerInput);
        }
    }

    private startPlayerVsComputerGame(): void {
        let message = "Please select input from\n";
        for (let state of this.config.states) {
            message += state + "\n\t";
        }

        this.util.fetchAndValidate(
            this,
            message,
            this.validatePlayerInput.bind(this)
        )
            .then(this.evaluateResult.bind(this))
            .catch(this.startPlayerVsComputerGame.bind(this));
    }

    private startComputerVsComputerGame(): void {
        const input1: string = this.getRandomState();
        console.log("Computer 1 has chosen: " + input1);
        const input2: string = this.getRandomState();
        console.log("Computer 2 has chosen: " + input2);

        this.evaluateResult(input1, input2);
    }

    private evaluateResult(input1: string, input2: string): void {
        const isWon = !!this.config.stateRules.filter((rule) => rule.winningState == input1 && rule.losingState == input2).length;
        if (isWon) {
            const name = this.config.mode == GAME_MODE.PvC ? "You": "Computer 1";
            console.log(name + " Won!");

            this.end(GAME_STATE.WIN);
            return;
        }

        const isLost = !!this.config.stateRules.filter((rule) => rule.winningState == input2 && rule.losingState == input1).length;
        if (isLost) {
            const name = this.config.mode == GAME_MODE.PvC ? "Computer 1": "Computer 2";
            console.log(name + " Won!");

            this.end(GAME_STATE.LOSE);
            return;
        }

        console.log("It's a Draw!");
        this.end(GAME_STATE.TIE);
    }

    private getRandomState(): string {
        const random = Math.floor(Math.random() * this.config.states.length);
        return this.config.states[random];
    }

    private processStates(): void {
        this.config.states = [];
        for (let state of this.config.stateRules) {
            if (!this.config.states.includes(state.winningState)) {
                this.config.states.push(state.winningState);
            }
        }
        console.log(this.config.states);
    }

    private end(state: GAME_STATE): void {
        console.log("Game Ended!");
        this.resolveFn(state);
    }
}