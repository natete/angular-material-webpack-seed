var storageService = require('./storage.service');

require('angular-local-storage');

angular
  .module('app.core.storage', ['LocalStorageModule'])
  .config(config)
  .service('StorageService', storageService);

/* @ngInject */
function config(localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('MY-APP')
    .setStorageType('localStorage');
}