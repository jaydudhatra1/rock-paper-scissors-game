import { Observable } from "rxjs";
import { Config, State } from "./Config";
import { EXCEPTIONS, GAME_MODE, GAME_STATE } from "./Enums";
import { Output } from "./Output";
import { Util } from "./Util";

export class Game {
    private config: Config;
    private util: Util;

    constructor(config: Config, observable: Observable<any>) {
        this.config = config;
        this.util = new Util(config, observable);
        this.processStates();
    }

    public start(): void {
        if (!this.config.mode) {
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

    private validatePlayerInput(resolve: Function, reject: Function, input: string): void {
        input = input.toLowerCase();

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
        let message = "Please select input from\n\t";
        for (let state of this.config.states) {
            message += state + "\n\t";
        }
        this.util.fetchAndValidate(
            this,
            message,
            this.validatePlayerInput.bind(this)
        )
            .then(this.evaluateResult.bind(this))
            .catch(() => {
                this.config.rejectorFn(EXCEPTIONS.INVALID_INPUT);
            });
    }

    private startComputerVsComputerGame(): void {
        const input1: string = this.getRandomState();
        console.log("Computer 1 has chosen: " + input1);
        const input2: string = this.getRandomState();
        console.log("Computer 2 has chosen: " + input2);

        this.evaluateResult(input1, input2);
    }

    private evaluateResult(input1: string, input2: string): void {
        input1 = input1.toLowerCase();
        input2 = input2.toLowerCase();

        const isWon = !!this.config.stateRules.filter((rule) => rule.winningState == input1 && rule.losingState == input2).length;
        const output = new Output();
        output.player1Response = input1;
        output.player2Response = input2;

        if (isWon) {
            const message = this.config.mode == GAME_MODE.PvC ? "You Won!": "Computer 1 Won!";
            console.log(message);
            output.message = message;
            output.state = GAME_STATE.WIN;
        }

        const isLost = !!this.config.stateRules.filter((rule) => rule.winningState == input2 && rule.losingState == input1).length;
        if (isLost) {
            const message = this.config.mode == GAME_MODE.PvC ? "You Lost!": "Computer 2 Won!";
            console.log(message);
            output.message = message;
            output.state = GAME_STATE.LOSE;
        }

        if (!isWon && !isLost) {
            const message = "It's a Tie!"
            console.log(message);
            output.message = message;
            output.state = GAME_STATE.TIE;
        }
        this.end(output);
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

    private end(output: Output): void {
        console.log("Game Ended!");
        this.config.resolverFn(output);
    }
}