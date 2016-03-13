/*eslint-disable*/
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: ['./src/index.js', './assets/stylesheets/application.scss'],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: '/',
    filename: "application.js"
  },
  resolve: {
    root: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'assets', 'stylesheets'),
      path.join(__dirname, 'assets', 'images'),
    ],
    extensions: ['', '.js', '.scss', '.svg'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=react,presets[]=es2015'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loader: 'file?hash=sha512&digest=hex&name=[hash].[ext]'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.ejs', // Move the index.html file
      title: 'Checklist',
      appMountId: 'app-container',
      window: {
        env: {
          apiHost: 'http://checklist-web-api.herokuapp.com'
        }
      }
    })
  ]
};
