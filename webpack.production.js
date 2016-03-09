var webpack = require('webpack');
var path = require('path');

var ManifestPlugin = require('webpack-manifest-plugin');

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractApplicationStyle = new ExtractTextPlugin('application-[contenthash].css');

var dist = path.join(__dirname, '../', '../');

module.exports = {
  context: dist,
  entry: [
    './app/frontend/javascripts/index.js',
    './app/frontend/stylesheets/application.scss',
  ],

  resolve: {
    root: [
      path.join(dist, 'app', 'frontend', 'javascripts'),
      path.join(dist, 'app', 'frontend', 'stylesheets')
    ],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.sass', 'config.js'],
  },

  output: {
    path: path.join(dist, 'public', 'assets'),
    filename: 'application-[chunkhash].js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'babel?presets[]=react,presets[]=es2015'
        ]
      },
      {
        test: /\.scss$/,
        loader: extractApplicationStyle.extract(['css', 'sass'])
      },
      {
        test: /\.(svg|png)$/,
        include: path.join(dist, 'app', 'frontend', 'images'),
        loader: 'file',
        query: {
          name: '[path][name]-[hash].[ext]',
          context: path.join(dist, 'app', 'frontend', 'images')
        }
      } 
    ]
  },

  plugins: [
    extractApplicationStyle,
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new ManifestPlugin()
  ]
};
