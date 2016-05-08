/*eslint-disable*/

var webpackConfig = require('./webpack.development.js');
var webpackTestConfig = Object.assign({}, webpackConfig, {
  entry: {},
  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
});

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

    webpack: webpackTestConfig,

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
