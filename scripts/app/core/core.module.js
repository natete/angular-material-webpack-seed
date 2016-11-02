require('./modules/config/config.module');
require('./modules/langs/langs.module');
require('./modules/constants/constants.module');
require('./modules/storage/storage.module');

require('angular-animate');
require('angular-aria');
require('angular-sanitize');
require('angular-cookies');
require('angular-material');

require('angular-ui-router');

angular
  .module('app.core', [
    'app.core.constants',
    'app.core.config',
    'app.core.langs',
    'app.core.storage',

    // Angular modules
    'ngMaterial',
    'ngCookies',
    'ngSanitize',
    'ngAnimate',

    // Reusable modules

    // 3rd party modules
    'ui.router'
  ]);
