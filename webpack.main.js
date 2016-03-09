var path = require('path');

var dist = path.join(__dirname);

module.exports = {
  context: dist,
  entry: ['./src/index.js', './assets/stylesheets/application.scss'],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: 'http://0.0.0.0:8080/assets/',
    filename: "application.js"
  },
  resolve: {
    root: [
      path.join(dist, 'src'),
      path.join(dist, 'assets', 'stylesheets')
    ],
    extensions: ['', '.js', '.scss'],
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
  }
};
