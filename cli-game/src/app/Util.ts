import { Observable, Subject } from 'rxjs';
import { Config } from './Config';
import { EXCEPTIONS } from './Enums';
export class Util {
    private observable: Observable<any>;
    private config: Config;

    constructor(config: Config, observable: Observable<any>) {
        this.observable = observable;
        this.config = config;
    }

    public fetchAndValidate(bindObj: Object, message: string, validatorFn: Function): Promise<number> {
        return new Promise((resolve, reject) => {
            const timeoutIndex = setTimeout(() => {
                this.config.rejectorFn(EXCEPTIONS.INPUT_NOT_PROVIDED);
            }, this.config.timeout);

            this.observable.subscribe((value) => {
                clearTimeout(timeoutIndex);
                validatorFn.call(bindObj, resolve, reject, value);
            })
        });
    }
}