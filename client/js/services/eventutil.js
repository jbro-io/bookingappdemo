'use strict';

angular.module('EventUtil', [])

.factory('broadcast', ['$rootScope', function($rootScope){
	return function(eventName, payload){
		$rootScope.$broadcast(eventName, payload);
	};
}])
.factory('listenTo', ['$rootScope', function($rootScope){
	return function(eventName, listener){
		$rootScope.$on(eventName, listener);
	};
}]);