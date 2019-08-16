/* eslint import/no-extraneous-dependencies: ["error", {devDependencies: true}] */
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  entry: {
    app: [
      '@babel/polyfill',
      './index.jsx',
    ],
  },
  mode: 'development',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './demo',
    hot: true,
    disableHostCheck: true,
    overlay: true,
    port: 8081,
  },
  devtool: 'inline-source-map',
});