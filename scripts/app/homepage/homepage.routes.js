module.exports = configRoutes;

/* @ngInject */
function configRoutes($stateProvider, VIEWS_CONSTANTS) {
  'use strict';
  $stateProvider
    .state(VIEWS_CONSTANTS.HOMEPAGE, {
      url: '/' + VIEWS_CONSTANTS.HOMEPAGE,
      template: '<my-app-homepage></my-app-homepage>'
    });
}