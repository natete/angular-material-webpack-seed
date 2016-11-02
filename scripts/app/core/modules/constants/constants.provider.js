module.exports = ConstantsProvider;

/* @ngInject */
function ConstantsProvider(GLOBAL_CONSTANTS, VIEWS_CONSTANTS) {
  'use strict';

  // Add here other constants you might have
  this.constants = angular.merge({}, GLOBAL_CONSTANTS, VIEWS_CONSTANTS);

  /* @ngInject */
  this.$get = function () {
    return this.constants;
  };
}

