/*eslint-disable*/
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: ['./src/index.js', './css/application.css'],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: '/',
    filename: "application.js"
  },
  resolve: {
    root: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'css'),
      path.join(__dirname, 'images'),
    ],
    extensions: ['', '.js', '.css', '.svg'],
  },
  root: [
    path.join(__dirname, 'src'),
    path.join(__dirname, 'test')
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=react,presets[]=es2015'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loader: 'file?hash=sha512&digest=hex&name=[hash].[ext]'
      }
    ],
  },
  postcss: function(webpack) {
    return [
      require('postcss-import')({ // Import all the css files...
        glob: true,
        addDependencyTo: webpack // ...so they get hot–reloaded when something changes...
      }),
      require('postcss-nested')(),
      require('postcss-simple-vars')(), // ...then replace the variables...
      require('postcss-focus')(), // ...add a :focus to ever :hover...
      require('autoprefixer')({ // ...and add vendor prefixes...
        browsers: ['last 2 versions', 'IE > 8'] // ...supporting the last 2 major browser versions and IE 8 and up...
      }),
      require('postcss-reporter')({ // This plugin makes sure we get warnings in the console
        clearMessages: true
      })
    ];
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: 'index.ejs', // Move the index.html file
      title: 'Checklist | Dev',
      appMountId: 'app-container'
    })
  ]
};
