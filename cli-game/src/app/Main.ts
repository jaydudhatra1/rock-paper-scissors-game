import { Config, RPS, RPSLS } from "./Config";
import { GAME_MODE, GAME_TYPE } from "./Enums";
import { Game } from "./Game";
import { Util } from "./Util";

export class Main {
    private config: Config;
    private game: Game;
    private util: Util;
    private gamePromise: Promise<any>;

    constructor(config?: Config) {
        this.config = config || {} as Config;
        this.util = new Util();
        // this.start();
        this.gamePromise = new Promise((resolve, reject) => {
            this.config.resolverFn = resolve;
            this.config.rejectorFn = reject;
        });
    }

    public start(): Promise<any> {
        if (!this.config.stateRules) {
        } else {
            this.game = new Game(this.config);
            this.game.start();
        }

        return this.gamePromise;
    }

    private validateGameMode(resolve: Function, reject: Function, input: string): void {
        const mode: GAME_TYPE = parseInt(input);
        console.log(this);
        switch(mode) {
            case GAME_TYPE.RPS:
                this.config.stateRules = RPS;
                resolve();
            case GAME_TYPE.RPSLS:
                this.config.stateRules = RPSLS;
                resolve();
                break;
            default:
                console.error("Please enter valid Game Mode.");
                reject();
        }
    }
}
module.exports = new Main({
    mode: GAME_MODE.PvC,
    stateRules: RPS,
    timeout: 5000
} as Config);
