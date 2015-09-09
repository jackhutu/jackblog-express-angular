(function () {
	
	'use strict';

	angular.module('jackblog')
	  .controller('NavbarCtrl', function ($rootScope,$scope,$state,Auth) {
	    $scope.isLoggedIn = Auth.isLoggedIn;
	    $scope.isAdmin = Auth.isAdmin;
	    $scope.getCurrentUser = Auth.getCurrentUser;
	    $scope.logout = function () {
	      Auth.logout();
	      $state.go('home',{},{reload:true});
	    };
	    //切换模式
	    $scope.changeMode = function () {
	    	$rootScope.dayMode = !$rootScope.dayMode;
	    };
	  });
})();
