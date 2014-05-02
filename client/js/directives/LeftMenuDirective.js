app.directive('leftmenu', ['$window', function($window){
	return {
		scope: {

		},
		link: function(scope, element, attrs){
			element.height($window.innerHeight);
		},
		controller: function($scope){
			$scope.toggle = function(){
				console.log('Toggle clicked...');
			}
		},
		templateUrl: 'partials/leftmenu.html',
		replace: false
	}
}]);