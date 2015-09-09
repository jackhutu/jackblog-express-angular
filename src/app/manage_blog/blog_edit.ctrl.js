(function () {
  'use strict';

  angular.module('jackblog.manage')
    .controller('BlogEditCtrl', function ($scope,$state,Tags,$log,Blog,lodash,$stateParams,toaster,$modal) {
      //初始化markdown
      $scope.aid = $stateParams.aid;
      if(!$scope.aid){
        $state.go('blogList');
      }
      Blog.getBlog({id:$scope.aid}).then(function (result) {
          $scope.article = result.data;
          var tags = {};
          lodash.map($scope.article.tags,function (tag) {
            tags[tag._id] = tag;
          });
          $scope.article.tags = tags;
      });
      Tags.getTagList({id:0}).then(function (result) {
        $scope.tagList = result.data;
      });

      //添加标签
      $scope.addTag = function (tag) {
        if(tag){
            $scope.article.tags[tag._id] = tag;
        }
      };
      //删除标签
      $scope.delTag = function (tag) {
        delete $scope.article.tags[tag];
      };
      //显示图片url
      $scope.showUrl = function (url) {
        $scope.selectImageUrl = url;
      };
      //从数组中删除图片
      $scope.delImage = function (index) {
        $scope.article.images.splice(index,1);
      };
      //图片处理.
      $scope.addImages = function () {
            var modalAdd = $modal.open({
              templateUrl: 'app/manage_blog/blog_images_add.html',
              controller: 'ModalBlogImagesAddCtrl'
            });

            modalAdd.result.then(function (img_url) {
              toaster.pop('success', '', '添加图片成功');
              $scope.article.images.push({url:img_url});
            });
      };

      //保存文章
      $scope.save = function (isRePub) {
        $scope.article.tags = lodash.keys($scope.article.tags);
        if(isRePub){
          $scope.article.isRePub = true;
        }
        Blog.updateBlog($scope.article._id,$scope.article).then(function () {
          toaster.pop('success', '', '保存文章 ' + $scope.article.title + ' 成功');
          $state.reload();
        }).catch(function (err) {
          err = err.data.error_msg || '保存文章失败.';
          toaster.pop('error', '', err);  
        }); 
      };
    });
})();
