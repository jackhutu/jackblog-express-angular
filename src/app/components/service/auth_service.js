(function () {
  'use strict';

  angular.module('jackblog.service')
    .factory('Auth', function Auth($location, $rootScope, $http, User, $cookies, $q,lodash, $window) {
      var currentUser = {};
      if($cookies.get('token')) {
        currentUser = User.get();
      }

      return {
        login: function(user, callback) {
          var cb = callback || angular.noop;
          var deferred = $q.defer();

          $http.post('/auth/local', {
            email: user.email,
            password: user.password,
            captcha:user.captcha
          }).
          success(function(data) {
            $cookies.put('token', data.token);
            currentUser = User.get();
            deferred.resolve(data);
            return cb();
          }).
          error(function(err) {
            this.logout();
            deferred.reject(err);
            return cb(err);
          }.bind(this));

          return deferred.promise;
        },

        snsLogin:function (provider,redirectUrl) {

          var search = '/auth/' + provider + '?redirectUrl=' + (redirectUrl || '/');
          if ($cookies.get('token')) {
            search += '&access_token=' + $cookies.get('token').replace(/(^\")|(\"$)/g, "");
          }
          $window.location.href = search;
        },

        logout: function() {
          $cookies.remove('token');
          currentUser = {};
        },

        /**
         * Gets all available info on authenticated user
         */
        getCurrentUser: function() {
          return currentUser;
        },

        /**
         * Check if a user is logged in
         *
         * @return {Boolean}
         */
        isLoggedIn: function() {
          return currentUser.hasOwnProperty('role');
        },

        /**
         * Waits for currentUser to resolve before checking if user is logged in
         */
        isLoggedInAsync: function(cb) {
          if(currentUser.hasOwnProperty('$promise')) {
            currentUser.$promise.then(function() {
              cb(true);
            }).catch(function() {
              cb(false);
            });
          } else if(currentUser.hasOwnProperty('role')) {
            cb(true);
          } else {
            cb(false);
          }
        },
        isLike: function (aid) {
          var index = lodash.findIndex(currentUser.likes,function (item) {
            return item.toString() === aid;
          });
          return (index !== -1)?true:false;
        },
        /**
         * Check if a user is an admin
         *
         * @return {Boolean}
         */
        isAdmin: function() {
          return currentUser.role === 'admin';
        },

        /**
         * Get auth token
         */
        getToken: function() {
          return $cookies.get('token');
        }
      };
    });
})();

