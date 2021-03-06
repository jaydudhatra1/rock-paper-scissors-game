import { InputScanner } from "./InputScanner";

export class Util {
    private scanner: InputScanner;

    constructor() {
        this.scanner = new InputScanner();
    }

    public fetchAndValidate(bindObj: Object, message: string, validatorFn: Function): Promise<number> {
        return new Promise((resolve, reject) => {
            let scan: Promise<any> = this.scanner.scanInput(message);
            scan.then(validatorFn.bind(bindObj, resolve, reject));
        });
    }
}