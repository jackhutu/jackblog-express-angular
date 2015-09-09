/*jshint loopfunc: true */
(function () {
  'use strict';

  angular.module('jackblog.manage')
    .controller('BlogWriteCtrl', function ($scope,$state,Tags,$modal,$log,Blog,lodash,toaster) {
      //初始化markdown
      $scope.article = {
        tags:{},
        top:false,
        content:''
      }; //用来保存文章的所有标签

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
      //保存文章
      $scope.save = function (status) {
        $scope.article.tags = lodash.keys($scope.article.tags);
        $scope.article.status = status || 0;
        $log.debug($scope.article);
        Blog.addBlog($scope.article).then(function (result) {
          if(status){
            toaster.pop('success', '', '保存文章 ' + $scope.article.title + ' 并发布成功');
            $state.go('blogList');
          }else{
            toaster.pop('success', '', '保存文章 ' + $scope.article.title + ' 为草稿成功');
            $state.go('blogEdit',{aid:result.article_id});
          }
        }).catch(function (err) {
          err = err.data.error_msg || '添加文章失败.';
          toaster.pop('error', '', err);  
        });
      };
      //图片列表
      $scope.images = [];
      //图片处理.
      $scope.addImages = function () {
            var modalAdd = $modal.open({
              templateUrl: 'app/manage_blog/blog_images_add.html',
              controller: 'ModalBlogImagesAddCtrl'
            });

            modalAdd.result.then(function (img_url) {
              toaster.pop('success', '', '添加图片成功');
              $scope.images.push({url:img_url});
            });
      };
      //复制URL到剪切板
      $scope.showUrl = function (url) {
        $scope.selectImageUrl = url;
      };
      //从数组中删除图片
      $scope.delImage = function (index) {
        $scope.images.splice(index,1);
      };
    })
    .controller('ModalBlogImagesAddCtrl',function ($scope,$modalInstance,Upload,Blog,toaster) {
      //图片种类,初始化为本地上传
      $scope.type = 'local';
      $scope.url = '';
      $scope.uploadImg = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/api/blog/uploadImage',
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function (data, status, headers, config) {
                    $modalInstance.close(data.img_url);
                }).error(function (err, status, headers, config) {
                    err = err.data.error_msg || '上传图片失败.';
                    toaster.pop('error', '', err);  
                });
            }
        }

      };

      $scope.fetchImg = function () {
        if($scope.url !== ''){
          Blog.fetchImage({url:$scope.url}).then(function (data) {
            $modalInstance.close(data.img_url);
          }).catch(function (err) {
            err = err.data.error_msg || '抓取图片失败.';
            toaster.pop('error', '', err);
          });
        }
      };


      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    });
})();
