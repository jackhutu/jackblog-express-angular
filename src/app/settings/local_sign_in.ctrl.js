(function () {
  'use strict';

  angular.module('jackblog.settings')
    .controller('LocalSignInCtrl', function ($rootScope,$scope,Auth,$state,$log,toaster,$cookies) {
      $scope.loginOauth = function (provider) {
        Auth.snsLogin(provider,$rootScope.previousUrl);
      };
      //获取验证码
      function getCaptcha() {
        $scope.captchaUrl = '/api/users/getCaptcha?' + Math.random();
      }
      getCaptcha();
      $scope.changeCaptcha = function () {
        getCaptcha();
      };

      $scope.user = {};
      function toLogin(){
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password,
          captcha: $scope.user.captcha
        })
          .then( function() {
            toaster.pop('success','','登录成功,欢迎光临!');
            $state.go('home');
          })
          .catch( function(err) {
            $scope.user.captcha = '';
            getCaptcha();
            err = err.error_msg || err.data.error_msg || "登录失败,请重试";
            toaster.pop('error','',err);
            $cookies.remove('token');
            //$state.go('signin',{},{reload:true});
          });
      }

      $scope.login = function(form) {
        if(form.$valid) {
          toLogin();
        }
      };
      $scope.loginPress = function(ev,form) {
        if (ev.which===13 && form.$valid){
          ev.preventDefault(); 
          toLogin();
        }
      };


    });
}());
