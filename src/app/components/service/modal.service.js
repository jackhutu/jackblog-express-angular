(function () {
    'use strict';

    angular.module('jackblog.service')
        .factory('CustomModalService', function ($modal) {
          return {
            open: function (ctrlName,url,size) {
                $modal.open({
                    templateUrl: url,
                    controller: ctrlName,
                    size: size
                });
            }
          };
        });
})();


