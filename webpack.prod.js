/* eslint import/no-extraneous-dependencies: ["error", {devDependencies: true}] */
const path = require('path');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common');

const appEntryPath = path.resolve(__dirname, 'index.jsx');

module.exports = merge(common, {
  entry: {
    app: [
      appEntryPath,
    ],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  mode: 'production',
  module: {
    rules: [
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
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      defaultSizes: 'gzip',
    }),
  ],
  externals: {
    react: 'commonjs react',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
      }),
    ],
  },
});
