(function () {
  'use strict';

  angular.module('jackblog.resources')
    .factory('Comment', function($resource){
      var commentResource = $resource('/api/comment/:id/:controller', {
          id: '@_id'
        },
        {
          //前台数据
          getFrontCommentList:{
            method:'GET',
            params:{
              controller:'getFrontCommentList'
            }
          },
          addNewComment:{
            method:'POST',
            params:{
              id:'addNewComment'
            }
          },
          addNewReply:{
            method:'POST',
            params:{
              controller:'addNewReply'
            }
          },
          delReply:{
            method:'PUT',
            params:{
              controller:'delReply'
            }
          }
        });

      return {
        addNewComment: function(data,callback){
          var cb = callback || angular.noop;
          return commentResource.addNewComment(data,function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        },
        getFrontCommentList:function (data,callback) {
          var cb = callback || angular.noop;
          return commentResource.getFrontCommentList(data,function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        },
        addNewReply:function (id,data,callback) {
          var cb = callback || angular.noop;
          return commentResource.addNewReply({id:id},data,function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        },
        delComment:function (data,callback) {
          var cb = callback || angular.noop;
          return commentResource.remove(data,function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        },
        delReply:function (id,data,callback) {
          var cb = callback || angular.noop;
          return commentResource.delReply({id:id},data,function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        }
      };

    });
})();

