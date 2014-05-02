'use strict';

app.controller('MainController', ['$scope','$googleCalendar','$config','Auth','$location','$modal',
						function($scope, $googleCalendar, $config, Auth, $location, $modal) {


	//================================================================================
	// Variables
	//================================================================================
	$scope.events = [];
	$scope.durations = [
		{label:'Half Day (4 hours)', hours:4},
		{label:'Full Day (8 hours)', hours:8}
	];

	var addEventModal = $modal({
		title: 'Add Event',
		template: 'partials/addEventModal.html',
		show: false,
		animation: 'am-fade-and-scale',
		scope: $scope
	});

	//================================================================================
	// Scope Functions
	//================================================================================
	$scope.getEvents = function() {
		$googleCalendar.getEvents().then(function(events) {
			console.log(events);
			$scope.events = events;
		});
	};
	$scope.getEvents();

	$scope.showAddEventModal = function() {
		addEventModal.$promise.then(addEventModal.show);
	};

	$scope.setCurrentEvent = function(event) {
		$scope.currentEvent = event;
	};

	$scope.addEvent = function() {

		console.log('Start Date:', $scope.event.startDate);

		//format end date/time object in to google format
		var endDate = new Date($scope.event.startDate);
		endDate.setHours(endDate.getHours() + $scope.event.duration.hours);
		console.log('End Date:', endDate);

		$googleCalendar.addEvent($scope.event.startDate, endDate, $scope.contactInfo).then(function(result) {
			console.log('Add Event Result:', result);
			addEventModal.hide();
		});
	};

	$scope.logout = function() {
		Auth.logout();
	};

}]);