# Rock-paper-scissors-game

### Overview
A simple rock paper scissors game with two varients.

1. [Rocker-Paper-Scissor](https://en.wikipedia.org/wiki/Rock_paper_scissors)
2. [Rocker-Paper-Scissor-Lizard-Spock](https://bigbangtheory.fandom.com/wiki/Rock,_Paper,_Scissors,_Lizard,_Spock)


Both varients has two modes.
```
1. Player vs Computer
2. Computer vs Computer
```

There are two Projects this game.
```
1. CLI Game - A cli game in Node.js
2. GUI Game - A gui game built in Angular using cli game's Js library.
```


### Project setup
There are different branches for cli-game and gui-game as follows.
```
cli-game - development-cli-game
gui-game - development-gui-game
```

##### Steps to build cli-game
```
1. Pull the latest code on development-cli-game
2. Go to cli-game directory
3. Run "npm install"
4. Run "npm run build"
5. Run "npm run start" to play the game
```
There are two modes supported by cli-game which are rock-paper scissors and rock-paper-scissor-lizard-spock.

In order to configure this game, go to Main.ts and change the configuration.
```
1. To play rock-paper-scissor in Player vs Computer mode with 4 seconds of timeout.
var app = new Main({
    mode: GAME_MODE.PvC,
    stateRules: RPS,
    timeout: 4000
});

2. To play rock-paper-scissors-lizard-spock in Computer vs Computer mode with same timeout.
var app = new Main({
    mode: GAME_MODE.CvC,
    stateRules: RPSLS,
    timeout: 4000
});
```

###### Project explaination
1. All the code is developed with typescript.
2. Using tsc compiler, Ts files are converted into Js.
3. Using webpack, Js files are getting bundled up into one file named "cli-game.js" inside "dist" folder.

###### Dev mode
Run below command for watching Ts files and build it in dev mode. It will create cli-game.js on saving a Ts file.
```
npm run dev
```

##### Steps to build gui-game
```
1. Pull the latest code from development-gui-game
2. Go to "cli-game" directory
3. Run "npm install"
4. Run "npm run build"
5. Go to "gui-game" directory
6. Run "npm install"
7. Run "ng serve" or "npm run ng"
8. Go to browser and open "localhost:4200"
9. Enjoy the game!
```

###### Project explaination
1. gui-game is developed with Angular.
2. cli-game library is used by Angular.
3. Angular is configuring cli-game and invokes the start() which will return a Promise and it will be either resolved or Rejected.
4. Configurations resides in player.component.ts


#### Area of improvements
```
1. Use Uglify in Production mode (npm run build)
2. Validation of states array which defines the behaviour of game.
3. Colors in CLI e.g. red color for failed input validation or loosing state.
4. Need to add retry logic when game ends in the cli-game.
5. Need to work on including type defination of cli library in Angular.
6. Need to add proper animations in gui-game.
7. Need to add a page where use can select the game type.
```
