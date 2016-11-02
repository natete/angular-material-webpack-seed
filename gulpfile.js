var gulp = require('gulp');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var webpackDevServer = require("webpack-dev-server");
var plugins = require('gulp-load-plugins')({lazy: true});

// Make gulp global so it can be used by the module
global.GULP = gulp;

global.PROJECT_DIR = __dirname;
global.CONFIG_PATH = __dirname + '/gulp.config';

var config = require(global.CONFIG_PATH);

// Instantiate module gulpfile to make its tasks available
require('./node_modules/matrix-angular-gulp/gulpfile');

/**
 * Copy index.html file to dist.
 */
gulp.task('build:copy:index', function () {
  return gulp
    .src(config.paths.html.index)
    .pipe(gulp.dest(config.paths.dist));
});

/**
 * Copy build directory to dist.
 */
gulp.task('build:copy:bundle', function () {
  return gulp
    .src(config.paths.project)
    .pipe(gulp.dest(config.paths.dist + '/build'));
});

/**
 * Copy the entire app to dist.
 */
gulp.task('copy:dev', function (done) {
  plugins
    .sequence
    .use(gulp)(
      'build:clean',
      ['build:copy:index', 'build:dist'],
      'build:copy:bundle',
      done
    );
});

/**
 * This tasks builds a deployable WAR file from the content in the dist directory.
 */
gulp.task('build:war', ['copy:dev'], function () {
  return gulp
    .src([config.paths.dist + '**', '!' + config.paths.dist + '**/*.map'])
    .pipe(plugins.war({
      welcome: 'index.html',
      displayName: 'My App'
    }))
    .pipe(plugins.zip('my-app.war'))
    .pipe(gulp.dest(config.paths.dist));
});

/**
 * Creates a dev build using just webpack for it.
 */
gulp.task('build:dev', function () {
  var webpackConfig = require('./webpack.config');
  webpackConfig.watch = false;
  return gulp
    .src('scripts/app/index.js')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('build/'));
});

/**
 * Serves a dev build using just webpack for it.
 */
gulp.task('serve:dev', function (done) {
  var webpackConfig = require('./webpack.config');
  webpackConfig.watch = true;

  webpackConfig.entry.unshift('webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server');

  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  webpackConfig.devtool = 'eval-source-map';
  webpackConfig.debug = true;

  new webpackDevServer(webpack(webpackConfig), {
    publicPath: '/build',
    stats: {
      colors: true
    }
  }).listen(8080, function (err) {
    if (err) {
      console.log(err);
      done();
    }
  });
});

/**
 * Creates a dist build using just webpack for it.
 */
gulp.task('build:dist', function () {
  var webpackConfig = require('./webpack.dist.config');
  webpackConfig.watch = false;

  return gulp
    .src('scripts/app/index.js')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('build/'));
});