const path = require('path');

module.exports = {
  // mode: development or production
  mode: 'development',
  // where should file started to read
  entry: './src/index.js',
  // where should the constructed file is build
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/',
  },
  // Website Server
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 8000,
    // watch html file
    watchContentBase: true,
  },
  // for solving in webpack
  // for development only
  devtool: 'eval-cheap-module-source-map',
};
