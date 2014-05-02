app.directive('keypad', ['$compile','broadcast',function($compile, broadcast){
	return {
		restrict: 'E',
		require: '^ngModel',
		scope: {
			ngModel: '=',
			id: '@',
			onDial: '&',
			onAnswer: '&',
			onIgnore: '&',
			onReject: '&'
		},
		controller: function($scope){
			console.log('Keypad instantiated...');
			$scope.dialHandler = function(){
				broadcast('Keypad.DIAL', $scope.ngModel);
				$scope.onDial();
			}
			$scope.addNumber = function(digit){
				console.log('digit:', digit);

				if($scope.ngModel === undefined)
					$scope.ngModel = '';

				$scope.ngModel = $scope.ngModel + digit;
			}
			$scope.clearNumber = function(){
				$scope.ngModel = '';
			}
		},
		templateUrl: 'partials/keypad.html',
		replace: false,
		link: function(scope, element, attrs){
			console.log('Keypad instantiated...');
			console.log('scope:', scope);
			
		}
	};
}]);