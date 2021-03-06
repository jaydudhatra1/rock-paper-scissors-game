var reader = require('readline');

export class InputScanner {
    constructor() {

    }

    public scanInput(): void {
        const readline = reader.createInterface({
            input: process.stdin,
            output: process.stdout
          });

          readline.question('Who are you?', (name: any) => {
            console.log(`Hey there ${name}!`);
            readline.close();
          });
    }
}