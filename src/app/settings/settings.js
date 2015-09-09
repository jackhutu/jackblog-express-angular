(function () {
  'use strict';

  angular.module('jackblog.settings',[])
    .config(function ($stateProvider) {
      $stateProvider
        .state('signin', {
          url: '/signin',
          templateUrl: 'app/settings/local_sign_in.html',
          controller: 'LocalSignInCtrl'
        })
        .state('setting', {
          url: '/setting',
          templateUrl: 'app/settings/user_setting.html',
          controller: 'SettingCtrl',
          onlyUser:true
        });
    });
})();
