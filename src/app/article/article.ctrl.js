(function () {
  'use strict';

  angular.module('jackblog.article')
    .controller('ArticleCtrl', function ($rootScope,$scope,$log,$state,$location,lodash,toaster,Auth,Blog,Comment,$stateParams) {

      $scope.aid = $stateParams.aid;
      if(!$scope.aid){
        $state.go('home');
      }
      $scope.isAdmin = Auth.isAdmin;
      $scope.isLoggedIn = Auth.isLoggedIn;

      //获取文章
      Blog.getFrontArticle({id:$scope.aid}).then(function (result) {
        $scope.article = result.data;
      }).then(function () {
        var options = {
          id:$scope.aid,
          sortName:'publish_time',
          tagId:''
        };
        if(localStorage.options){
          options = lodash.merge(options,JSON.parse(localStorage.options));
        }
        //获取上一篇下一篇
        Blog.getPrenext(options).then(function (result) {
          $scope.next = result.data.next || {};
          $scope.prev = result.data.prev || {};
        });
      }).catch(function () {
        $state.go('home'); 
      });
      //获取评论.
      Comment.getFrontCommentList({id:$scope.aid}).then(function (result) {
        $scope.commentList = result.data;
      }).catch(function (err) {
        $log.debug(err);
        $scope.commentList = [];
      });
      //获取是否喜欢过
      Auth.isLoggedInAsync(function(loggedIn) {
        if (loggedIn) {
          $scope.isLike = Auth.isLike($scope.aid);
        }else{
          $scope.isLike = false;
        }
      });
      //评论大致分两种,1,针对文章的评论,需要userID,articleId;
      //2.针对评论的评论,需要userId,articleId,commentId,被评论者的userId
      $scope.newComment = {
        content:''
      };
      //提交新评论
      $scope.submitNewComment = function (aid) {
        $scope.newComment.aid = aid;
        Comment.addNewComment($scope.newComment).then(function (result) {
          $scope.commentList.push(result.data);
          $scope.newComment.content = '';
        }).catch(function (err) {
          $log.debug(err);
          toaster.pop('error','','评论添加错误,请重试.');
        });
      };
      //跳转到评论框
      $scope.goToComment = function (id) {
        //如果未登录则弹出登录框
        Auth.isLoggedInAsync(function(loggedIn) {
          if (loggedIn) {
            $('#' +id).focus();
          }else{
            $rootScope.opneSnsModal();
          }
        });
      };
      //喜欢按钮
      $scope.toggleLike = function (aid) {
        //如果未登录则弹出登录框
        Auth.isLoggedInAsync(function(loggedIn) {
          if (loggedIn) {
            Blog.toggleLike({id:aid}).then(function (result) {
              $scope.article.like_count = result.count;
              $scope.isLike = result.isLike;
            });
          }else{
            $rootScope.opneSnsModal();
          }
        });
      };

    });
})();
