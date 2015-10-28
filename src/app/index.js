(function () {
	'use strict';

	angular.module('jackblog', [
			'ngAnimate',
			'ngCookies',
			'ngTouch',
			'ngSanitize',
			'ui.router', 
			'ui.bootstrap',
			'ngLodash',
			'ngProgress',
			'toaster',
			'ngFileUpload',
			'jackblog.resources',
			'jackblog.service',
			'jackblog.filter',
			'jackblog.directives',
			'jackblog.manage',
			'jackblog.article',
			'jackblog.settings'
		])
	.config(function ($logProvider,$stateProvider, $urlRouterProvider, $locationProvider, $httpProvider,IsDebug) {
	  $locationProvider.html5Mode(true);
	  $httpProvider.defaults.timeout = 500000;
	  $httpProvider.interceptors.push('AuthInterceptor');
	  // Enable log
	  $logProvider.debugEnabled(IsDebug);
	  $urlRouterProvider.otherwise('/');
	})
	  .run(function ($rootScope, ngProgressFactory, $state, lodash, Auth, Blog, $cookies, CustomModalService, toaster) {
			//默认头像
			$rootScope.default_avatar = '/assets/images/avatar.png';
			//首页图片
			Blog.getIndexImage().then(function (result) {
			  $rootScope.indexImg = result.img;
			}).catch(function () {
				$rootScope.indexImg = '/assets/images/shanghai.jpg';
			});
			//登录模块.
			$rootScope.opneSnsModal = function () {
				CustomModalService.open('SnsSignInCtrl','app/settings/sns_sign_in.html');
			};
			//加载进度
			$rootScope.progressbar = ngProgressFactory.createInstance();
			//登录之后不可进入页面.
			var routesThatForLogins  = ['/signin','/signup'];
			var routeLogin  = function (route) {
				return lodash.find(routesThatForLogins,
					function (noAuthRoute) {
						return lodash.startsWith(route, noAuthRoute);
					});
			};

	    // 页面权限判断
	    $rootScope.$on('$stateChangeStart', function (event, toState) {
	    	$rootScope.progressbar.setColor('green');
				$rootScope.progressbar.reset(); // Required to handle all edge cases.
				$rootScope.progressbar.start();
				//已登录就需要跳转的页面
				Auth.isLoggedInAsync(function(loggedIn) {
				  if (routeLogin(toState.url) && loggedIn) {
				    event.preventDefault();
				    $state.go('home');
				  }else if(toState.onlyAdmin && !Auth.isAdmin()){
				  	event.preventDefault();
				    $state.go('home');
				  }else if(toState.onlyUser && !loggedIn){
			  		event.preventDefault();
			  	  $state.go('home');
				  }
				});

	    });

			// When route successfully changed.
			$rootScope.$on('$stateChangeSuccess', function(ev,toState,toParams,fromState,fromParams) {
				$rootScope.progressbar.complete();
				$rootScope.previousState = fromState;
				$rootScope.previousParams = fromParams;
			});
			//sns signin 拦截
			$rootScope.$on('$locationChangeSuccess', function(ev, url, oldUrl){
				$rootScope.currentUrl = url;
			  $rootScope.previousUrl = oldUrl;
			  var snsmsg = $cookies.get('snsmsg');
			  if(snsmsg){
			  	snsmsg = JSON.parse(snsmsg);
			  	toaster.pop(snsmsg.msgtype,'',snsmsg.msg);
			  	$cookies.remove('snsmsg');
			  }

			});
			// When some error occured.
			$rootScope.$on('$stateChangeError', function() {
				$rootScope.progressbar.reset();
			});

	  });
})();
