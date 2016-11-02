module.exports = LangsDirective;

/* @ngInject */
function LangsDirective() {
  'use strict';
  return {
    restrict: 'A',
    replace: true,
    template: require('./langs.html'),
    controller: controller
  };

}

/* @ngInject */
function controller($scope, LangsService) {
  $scope.currentLocaleDisplayName = LangsService.getCurrentLocaleDisplayName();
  $scope.localesDisplayNames = LangsService.getSupportedLocalesDisplayNames();
  $scope.visible = $scope.localesDisplayNames && $scope.localesDisplayNames.length > 1;
  $scope.changeLanguage = function (locale) {
    LangsService.setLocaleByDisplayName(locale);
  };
}
