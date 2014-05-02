'use strict';

app.directive('searchlist', ['broadcast', function(broadcast){
	return {
		restrict: 'E',
		require: '^ngModel',
		scope: {
			records: '=',
			all: '&',
			find: '&',
			call: '&',
			search: '=',
			current: '='
		},
		controller: function($scope){
			$scope.select = function(record){
				$scope.current = $scope.currentRecord = record;
			}

			$scope.dial = function(number){
				$scope.call({number: number});
			}
		},
		templateUrl: 'partials/searchList.html'
	}
}]);