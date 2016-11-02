var configModule = require('./homepage.routes');
var homepageCtrl = require('./homepage.controller');
var homepageComponent = require('./homepage.component');

angular
  .module('app.homepage', [])
  .config(configModule)
  .controller('HomepageController', homepageCtrl)
  .component('myAppHomepage', homepageComponent);


