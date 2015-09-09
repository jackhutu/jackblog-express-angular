(function () {
	'use strict';

	angular.module('jackblog.article',[])
	  .config(function ($stateProvider) {
	    $stateProvider
	      .state('article', {
	        url: '/article/:aid',
	        templateUrl: 'app/article/article.html',
	        controller: 'ArticleCtrl'
	      });
	  });
})();
