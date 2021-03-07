var dts = require('dts-bundle');

dts.bundle({
	name: 'cli-game',
	main: 'dist/obj/Main.d.ts',
	out: '../cli-game-types.d.ts',
	outputAsModuleFolder: false,
});