/*eslint-disable*/

var webpackConfig = require('./webpack.development.js');
webpackConfig.entry = {};

module.exports = function karmaConfig(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome'],
    autoWatchBatchDelay: 300,

    files: [
      './src/**/*-test.js',
    ],

    preprocessors: {
      './src/**/*-test.js': ['webpack', 'sourcemap'],
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    },

    plugins: [
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      'karma-mocha',
      'karma-chai',
      'karma-mocha-reporter',
    ]
  });
}
