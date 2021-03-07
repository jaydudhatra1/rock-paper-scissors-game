import { Observable, Observer, Subject } from "rxjs";
import { Config, RPS, RPSLS } from "./Config";
import { GAME_MODE, GAME_TYPE } from "./Enums";
import { Game } from "./Game";

export class Main {
    private config: Config;
    private game: Game;
    private gamePromise: Promise<any>;
    private observable: Observable<any>;
    private observer: Observer<any>;

    constructor(config?: Config) {
        this.config = config || {} as Config;
        this.observable = new Observable((observer) => {
            this.observer = observer;
        });
        this.gamePromise = new Promise((resolve, reject) => {
            this.config.resolverFn = resolve;
            this.config.rejectorFn = reject;
        });
    }

    public start(): Promise<any> {
        if (!this.config.stateRules) {
        } else {
            this.game = new Game(this.config, this.observable);
            this.game.start();
        }

        return this.gamePromise;
    }

    public input(input: string) {
        this.observer.next(input);
    }
}
module.exports.game = Main;
// module.exports.game = new Main({
//     mode: GAME_MODE.PvC,
//     stateRules: RPS,
//     timeout: 1000
// } as Config);

module.exports.rock_scissors_paper_states = RPS;
module.exports.rocker_paper_scissors_lizard_spock_states = RPSLS;
