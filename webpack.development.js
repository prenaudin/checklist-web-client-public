/*eslint-disable*/
var mainConfig = require('./webpack.main.js');

var API_ENV = 'development';
switch (API_ENV) {
  case 'development':
    var BASE_API_URL = 'http://localhost:5000';
    break;
  case 'test':
    var BASE_API_URL = 'https://test.checklist.run';
    break;
  default:
    var BASE_API_URL = 'https://checklist-web-api.herokuapp.com';
}

var devConfig = Object.assign({}, mainConfig, {
  devServer: {
    proxy: {
      '/api/*': BASE_API_URL,
      '/public/*': BASE_API_URL,
    },
  }
});

module.exports = devConfig;
