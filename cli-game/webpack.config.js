const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './dist/obj/Main.js',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: [ nodeExternals() ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'game-cli.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node'
};