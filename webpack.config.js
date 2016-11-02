var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractExtraSass = new ExtractTextPlugin('extra-styles.css');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var fs = require('fs');

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  devServer: {
    hot: true,
    inline: true
  },
  entry: ['./scripts/app/index.js'],
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: 'build/',
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        include: /\.scss/,
        exclude: /my-app-extra-styles\.scss/,
        loaders: ['css-to-string', 'css', 'postcss', 'resolve-url', 'sass?sourceMap']
      },
      {
        test: /\.scss$/,
        include: /my-app-extra-styles\.scss/,
        loader: extractExtraSass.extract(['css', 'postcss', 'resolve-url', 'sass?sourceMap'])
      },
      {
        test: /\.html$/,
        loader: 'html',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'raw',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'css?sourceMap',
        exclude: /assets/
      },
      {
        test: /\.(woff2?)(\?[\s\S]+)?$/,
        loader: 'url?limit=10000?name=[path][name].[ext]'
      },
      {
        test: /\.(svg|ttf|eot|svg|gif)(\?[\s\S]+)?$/,
        loader: 'file?name=[path][name].[ext]'
      },
      {
        test: /\.(png|jpe?g)$/,
        loaders: ['url?limit=8192&name=[path][name].[ext]', 'image-webpack?bypassOnDebug&optimizationLevel=5&interlaced=false']
      },
      {
        test: /config\.constants\.js$/,
        exclude: /node_modules/,
        loader: 'string-replace',
        query: {
          multiple: getProfileSettings()
        }
      }
    ]
  },
  postcss: [autoprefixer],
  resolve: {
    root: [path.resolve(__dirname)],
    alias: {}
  },
  plugins: [
    extractExtraSass,

    new CopyWebpackPlugin(
      [{from: 'node_modules/angular-i18n', to: 'assets/locale/i18n'}],
      {ignore: ['*.md', '*.json', {dot: true}]}
    ),

    new CopyWebpackPlugin([{from: 'assets/locale', to: 'assets/locale'}])
  ]
};

function getProfileSettings() {
  var profile = process.env.profile ? process.env.profile : 'development';
  var settings = JSON.parse(fs.readFileSync('./assets/config/json/' + profile + '.json', 'utf8'));
  var prefix = '@@';
  var result = [];

  for (var key in settings) {
    result.push(
      {
        search: prefix + key,
        replace: settings[key]
      }
    );
  }

  return result;
}
