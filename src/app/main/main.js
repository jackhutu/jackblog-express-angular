(function () {
	'use strict';

	angular.module('jackblog')
	.config(function ($stateProvider) {
		$stateProvider
		  .state('home', {
		    url: '/',
		    templateUrl: 'app/main/main.html',
		    controller: 'MainCtrl',
		    controllerAs: 'main'
		  });
	});
})();
