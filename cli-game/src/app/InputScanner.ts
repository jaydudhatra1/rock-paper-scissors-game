var reader = require('readline');

export class InputScanner {
    constructor() {

    }

    public scanInput(message: string): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const readline = this.getReader();

          readline.question(message, (readerValue: any) => {
            readline.close();
            resolve(readerValue);
          });

        } catch(exception) {
          reject(exception);
        }
      });
    }

    public getReader(): any {
      return reader.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    }
}