(function () {
  'use strict';

  angular.module('jackblog.settings')
    .controller('SettingCtrl', function ($scope,User,Auth,toaster,$state) {
      $scope.user = User.get();

      $scope.mdUser = function (form) {
        if(form.$valid) {
          User.mdUser($scope.user).then(function (result) {
            $scope.user = result.data;
            toaster.pop('success', '', '修改资料成功');
          }).catch(function (err) {
            err = err.data.error_msg || '修改用户失败';
            toaster.pop('error', '', err);
            $state.reload();
          });
        }
      };
      //获取社交账号绑定情况.
      // User.getUserProvider().then(function (result) {
      //   $scope.providerInfo = result.data;
      // }).catch(function (err) {
      //   console.log(err);
      // });
      // $scope.connectOauth = function(provider) {
      //   $window.location.href = '/connect/' + provider;
      // };


    });
})();
