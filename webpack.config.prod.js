const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // mode: development or production
  mode: 'production',
  // where should file started to read
  entry: {
    bundle: './src/index.js',
  },
  // where should the constructed file is build
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/',
  },
  devtool: 'cheap-source-map',
  // for production on cleaning the dist file
  // npm install --save-dev clean-webpack-plugin
  plugins: [new CleanWebpackPlugin()],

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
