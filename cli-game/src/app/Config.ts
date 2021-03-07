import { GAME_MODE } from "./Enums";

export class Config {
    public mode: GAME_MODE;
    public timeout: number;
    public stateRules: State[];
    public states: string[];
    public resolverFn?: Function;
    public rejectorFn?: Function;

    constructor(stateRules: State[], timeout?: number) {
        this.stateRules = stateRules;
        this.timeout = timeout || 5000; // 5 seconds is default value of timeout
    }
}

export class State {
    public winningState: string;
    public losingState: string;
}

// Rules for Rock-Paper-Scissors
export const RPS: State[] = [
    {winningState: "rock", losingState: "scissors"},
    {winningState: "scissors", losingState: "paper"},
    {winningState: "paper", losingState: "rock"}
];

// Rules for Rock-Paper-Scissors-Lizard-Spock
export const RPSLS: State[] = [
    {winningState: "rock", losingState: "scissors"},
    {winningState: "scissors", losingState: "paper"},
    {winningState: "paper", losingState: "rock"},
    {winningState: "rock", losingState: "lizard"},
    {winningState: "lizard", losingState: "spock"},
    {winningState: "spock", losingState: "scissors"},
    {winningState: "scissors", losingState: "lizard"},
    {winningState: "lizard", losingState: "paper"},
    {winningState: "paper", losingState: "spock"},
    {winningState: "spock", losingState: "rock"}
];