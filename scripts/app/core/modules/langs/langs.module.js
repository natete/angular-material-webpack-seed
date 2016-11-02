require('angular-translate');
require('angular-dynamic-locale');
require('angular-translate-handler-log');
require('angular-translate-loader-static-files');
require('angular-translate-storage-cookie');
require('angular-translate-storage-local');

var langsService = require('./langs.service');
var langsDirective = require('./langs.directive');
var langsConstants = require('./langs.constants');

angular
  .module('app.core.langs', [
    'pascalprecht.translate',
    'tmh.dynamicLocale'
  ])
  .config(config)
  .run(run)
  .service('LangsService', langsService)
  .directive('langsSelect', langsDirective)
  .constant('LOCALES', langsConstants);


/* @ngInject */
function config($translateProvider, tmhDynamicLocaleProvider, CORE_CONFIGS, GLOBAL_CONSTANTS) {
  $translateProvider.useSanitizeValueStrategy('sanitizeParameters').useStaticFilesLoader({
    prefix: GLOBAL_CONSTANTS.LANGUAGE.LOCATION + GLOBAL_CONSTANTS.LANGUAGE.PREFIX,
    suffix: GLOBAL_CONSTANTS.LANGUAGE.SUFFIX
  });

  $translateProvider.preferredLanguage(CORE_CONFIGS.DEFAULT_LANGUAGE); // is applied on first load
  $translateProvider.useMissingTranslationHandlerLog();
  $translateProvider.useLocalStorage();// saves selected language to localStorage
  // loadING the $locale settings files for angular-dynamic-locale
  tmhDynamicLocaleProvider.localeLocationPattern(GLOBAL_CONSTANTS.LANGUAGE.I18_LOCATION
    + '/angular-locale_{{locale}}.js');
}

/**
 * Run function on startup language mudules.
 * @param {type} $translate
 * @param {type} CORE_CONFIGS
 * @returns {langs.module_L28.run}
 */
/* @ngInject*/
function run($translate, CORE_CONFIGS, LangsService) {
  // default language
  var language = CORE_CONFIGS.DEFAULT_LANGUAGE;
  var browserLanguage = LangsService.getBrowserLanguage();
  if (browserLanguage !== undefined) {
    var isBrowserLanguageValid = LangsService.isValidLocale(browserLanguage);
    if (isBrowserLanguageValid) {
      language = browserLanguage;
    } else {
      // if the browser language is not valid, we try to look for the simplified language
      browserLanguage = browserLanguage.split('_')[0];
      isBrowserLanguageValid = LangsService.isValidLocale(browserLanguage);
      if (isBrowserLanguageValid) {
        language = browserLanguage;
      }
    }
  }
  $translate.use(language);
}
