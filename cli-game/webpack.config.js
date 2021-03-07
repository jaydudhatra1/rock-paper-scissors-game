const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './dist/obj/Main.js',
  externals: [ nodeExternals() ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'game-cli.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'game',
    libraryTarget:'umd'
  }
};