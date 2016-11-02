var config = require('./node_modules/matrix-angular-gulp/gulp/gulp.config');

module.exports = function () {
  // Add here your own configs or overwrite the values you want.

  config.packageMode = 'WEBPACK';

  config.paths.project = 'build/**/*';

  return config;
}();
