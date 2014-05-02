'use strict';

app.factory('$config', ['$location', function($location) {
     var baseUrl;

    if($location.host() === 'localhost') {
        baseUrl = 'http://localhost:' + $location.port();
    } else {
        baseUrl = 'https://' + $location.host();
    }

    console.log('Base URL:' + baseUrl);

	return {
		server: baseUrl
    }
}]);