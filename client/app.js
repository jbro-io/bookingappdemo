'use strict';

var app = angular.module('app', [
	'ngRoute',
    'ngCookies',
    'authentication',
    'EventUtil',
    'GoogleCalendarService',
    'mgcrea.ngStrap',
    'ngAnimate',
    'InputField'
])

.config(['$routeProvider','$httpProvider', function($routeProvider, $httpProvider) {
	$routeProvider.when('/login', {templateUrl: 'partials/authentication/login.html', controller: 'LoginController'});
    $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: 'MainController'});
    $routeProvider.otherwise({redirectTo: '/login'});

    //CORS
    // $httpProvider.defaults.useXDomain = true; //sets IE to use XDomainRequest instead of XHR
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

;