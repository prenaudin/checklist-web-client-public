/*eslint-disable*/
var webpack = require('webpack');
var path = require('path');

var ManifestPlugin = require('webpack-manifest-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractApplicationStyle = new ExtractTextPlugin('application-[contenthash].css');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var mainConfig = require('./webpack.main.js');

mainConfig.output = {
  path: path.join(__dirname, 'public'),
  publicPath: '/',
  filename: 'application-[chunkhash].js',
};

mainConfig.plugins = [
  extractApplicationStyle,
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  // new webpack.ProvidePlugin({
  //   'Promise': 'es6-promise',
  //   'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  // }),
  new ManifestPlugin(),
  new HtmlWebpackPlugin({
    template: 'index.ejs',
    title: 'Checklist',
    mobile: true,
    minify: { // Minifying it while it is parsed
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    },
    appMountId: 'app-container',
  }),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }
  })
];

module.exports = mainConfig;
