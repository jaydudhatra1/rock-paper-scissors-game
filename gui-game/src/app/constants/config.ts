import { GAME_MODE } from "./enums";

export class Config {
    public timeout: number;
    public stateRules: State[];
    public mode?: GAME_MODE;
    public states?: string[];

    constructor(stateRules: State[], timeout?: number) {
        this.stateRules = stateRules;
        this.timeout = timeout || 5000; // 5 seconds is default value of timeout
    }
}

export class State {
    public winningState?: string;
    public losingState?: string;
}

// Rules for Rock-Paper-Scissors
export const RPS: State[] = [
    // tslint:disable-next-line:quotemark
    {winningState: "rock", losingState: "scissor"},
    {winningState: "scissor", losingState: "paper"},
    {winningState: "paper", losingState: "rock"}
];

// Rules for Rock-Paper-Scissors-Lizard-Spock
export const RPSLS: State[] = [
    {winningState: "rock", losingState: "Scissors"},
    {winningState: "Scissors", losingState: "paper"},
    {winningState: "paper", losingState: "rock"},
    {winningState: "rock", losingState: "lizard"},
    {winningState: "lizard", losingState: "spock"},
    {winningState: "spock", losingState: "Scissors"},
    {winningState: "Scissors", losingState: "lizard"},
    {winningState: "lizard", losingState: "paper"},
    {winningState: "paper", losingState: "spock"},
    {winningState: "spock", losingState: "rock"}
];