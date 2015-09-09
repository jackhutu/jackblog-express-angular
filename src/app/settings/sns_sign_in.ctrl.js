(function () {
	'use strict';

	angular.module('jackblog.settings')
	  .controller('SnsSignInCtrl', function ($rootScope,$scope,Auth) {
	  	$scope.loginOauth = function (provider) {
	  	  Auth.snsLogin(provider,$rootScope.currentUrl);
	  	};
	  });
})();
