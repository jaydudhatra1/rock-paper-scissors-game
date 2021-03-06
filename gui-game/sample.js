// const game = require("../cli-game/dist/obj/Main");
const game = require("../cli-game/dist/game-cli");
console.log(game);
game.config.mode = 1;
game.start();