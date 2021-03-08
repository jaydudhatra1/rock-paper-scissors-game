import { Observable, Subject } from 'rxjs';
import { Config } from './Config';
import { EXCEPTIONS } from './Enums';
import { InputScanner } from './InputScanner';
export class Util {
    private observable: Observable<any>;
    private config: Config;
    private scanner: InputScanner;

    constructor(config: Config, observable: Observable<any>) {
        this.observable = observable;
        this.config = config;
        this.scanner = new InputScanner();
    }

    public fetchAndValidate(bindObj: Object, message: string, validatorFn: Function): Promise<number> {
        return new Promise((resolve, reject) => {

            const timeoutIndex = setTimeout(() => {
                console.log(EXCEPTIONS.INPUT_NOT_PROVIDED);
                this.scanner.readline.close();
                this.config.rejectorFn(EXCEPTIONS.INPUT_NOT_PROVIDED);
            }, this.config.timeout);

            let scan: Promise<any> = this.scanner.scanInput(message);
            scan.then((value) => {
                clearTimeout(timeoutIndex);
                validatorFn.call(bindObj, resolve, reject, value);
            }).catch();

        });
    }
}