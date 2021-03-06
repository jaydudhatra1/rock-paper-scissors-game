import { InputScanner } from "./InputScanner";

class Main {
    private scanner: InputScanner;
    private config: any;

    constructor(config: any) {
        this.scanner = new InputScanner();
        this.config = config;
        this.start();
    }

    private start(): void {
        this.scanner.scanInput();
    }
}
var app = new Main({});