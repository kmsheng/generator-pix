'use strict';

angular.module('<%= appName %>', ['ui.compat'])
.config(['$stateProvider', '$routeProvider', '$urlRouterProvider', function ($stateProvider, $routeProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('main', {
        url: "/",
        controller: 'MainCtrl',
        templateUrl: 'main.phtml'
    })
    .state('about', {
        url: "/about",
        controller: 'AboutCtrl',
        templateUrl: 'about.phtml'
    });
}]);
