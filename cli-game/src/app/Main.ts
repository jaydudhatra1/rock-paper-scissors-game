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
        this.start();
        this.gamePromise = new Promise((resolve, reject) => {
            this.config.resolverFn = resolve;
            this.config.rejectorFn = reject;
        });
    }

    public start(): Promise<any> {
        if (!this.config.stateRules) {
            this.getGameType();
        } else {
            this.game = new Game(this.config);
            this.game.start();
        }

        return this.gamePromise;
    }

    private getGameType(): void {
        this.util.fetchAndValidate(
            this,
            "Please select game type. \n\tPress 1 for rock paper scissors \n\tPress 2 for rock paper scissors lizard spock\n",
            this.validateGameMode.bind(this)
        )
        .then(this.start.bind(this))
        .catch(this.start.bind(this));
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
    stateRules: RPSLS,
    timeout: 5000
} as Config);
