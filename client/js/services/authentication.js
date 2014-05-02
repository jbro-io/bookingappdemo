'use strict';

angular.module('authentication', [])

.factory('Auth', ['$log','$location','$cookies','$http','$q','$config',
		function($log, $location, $cookies, $http, $q, $config) {

	return {
		isAuthenticated: function() {
			var user = $cookies.profile;

			if(user) {
				return true;
			}

			return false;
		},
		getUser: function() {
			var user = $cookies.profile;
			console.log(user);
			return user;
		},
		logout: function() {
			delete $cookies.profile;
			$location.path('/login');
		}
	};
}])

.factory('AuthInterceptor', ['$q','$cookies','$location', function($q, $cookies, $location) {
	return {
		response: function(response) {
			if(response.status === 401) {
				console.log('Response 401');
			}
			return response || $q.when(response);
		},
		responseError: function(rejection) {
			if(rejection.status === 401) {
				console.log('Response Error 401', rejection);
				$cookies.profile = null;
				$location.path('/login');
			}
			return $q.reject(rejection);
		}
	};
}])

.controller('LoginController', ['$scope','$log','$timeout','$window','Auth', function($scope, $log, $timeout, $window, Auth) {

}])

.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
}])

.run(['$rootScope','Auth','$location', function($rootScope, Auth, $location) {
	//verify the user is authenticated when the user changes routes
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        //change route to login if user isnt authenticated
        if(!Auth.isAuthenticated()) $location.path('/login');
    });
}])

;