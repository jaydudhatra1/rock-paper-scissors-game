var reader = require('readline');

export class InputScanner {
    public readline;
    constructor() {

    }

    public scanInput(message: string): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          this.readline = this.getReader();

          this.readline.question(message, (readerValue: any) => {
            this.readline.close();
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