(function () {
	'use strict';

	angular.module('jackblog.service')
		.factory('AuthInterceptor', function ($rootScope, $q, $cookies, $location) {

	  return {
	    request: function (config) {
	      config.headers = config.headers || {};
	      if ($cookies.get('token')) {
	        config.headers.Authorization = 'Bearer ' + $cookies.get('token').replace(/(^\")|(\"$)/g, "");
	      }
	      return config;
	    },
      response: function (response) {
  	    return response;
      },
			responseError:function(rejection){
				if (rejection.status === 401) {
					$cookies.remove('token');
					$location.path('/signin');
					return $q.reject(rejection);
				}else {
					return $q.reject(rejection);
				}
			}
	  };
	});
})();

