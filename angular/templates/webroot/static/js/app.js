'use strict';

angular.module('testApp', ['ui.compat'])
.config(['$stateProvider', '$routeProvider', '$urlRouterProvider', function ($stateProvider, $routeProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('route1', {
        url: "/",
        controller: 'MainCtrl',
        templateUrl: 'main.phtml'
    })
    .state('route2', {
        url: "/route2",
        controller: 'Route2Ctrl',
        templateUrl: 'route2.phtml'
    });
}]);
