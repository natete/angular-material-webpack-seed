var globalConstants = require('./global.constants');
var viewsConstants = require('./views.constants');
var constantsProvider = require('./constants.provider');

angular
  .module('app.core.constants', [])
  .constant('GLOBAL_CONSTANTS', globalConstants)
  .constant('VIEWS_CONSTANTS', viewsConstants)
  .provider('Constants', constantsProvider);

