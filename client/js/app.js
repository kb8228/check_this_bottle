angular.module('wineApp', ['ngRoute']).
  config(['$routeProvider', '$httpProvider', 
    function($routeProvider, $httpProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'index.html',
          controller: 'WineController',
          controllerAs: 'winesCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }]);