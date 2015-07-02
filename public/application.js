//Manual bootstrapping
var mainApplicationModuleName = 'mean';

// add the ngRoute, users modules as a dependency for  main application's module
var mainApplicationModule = angular.module(mainApplicationModuleName,
    ['ngResource', 'ngRoute', 'users', 'example', 'articles', 'chat']);

//supports Hashbangs configuration urls for single-page application routes
mainApplicationModule.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

//Facebook's redirect bug that adds a hash part to the application's URL
//after the OAuth authentication round-trip
if (window.location.hash === '#_=_') window.location.hash = '#!';

//used the angular object jqLite functionality to bind a function to the 
// document-ready event. In that function, you used the angular.bootstrap() 
//method to initiate a new AngularJS application using the main application module.
angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});