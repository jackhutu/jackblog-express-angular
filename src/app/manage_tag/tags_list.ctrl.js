(function () {
  'use strict';

  angular.module('jackblog.manage')
    .controller('TagsListCtrl', function ($scope,$modal,$state,$stateParams,Tags,toaster) {
      $scope.cid = $stateParams.cid || 0;
      //获取标签列表
      Tags.getTagList({id:$scope.cid}).then(function(result){
        $scope.tagList = result.data;
      });
      //获取分类列表.
      Tags.getTagCatList().then(function (result) {
        $scope.catList = result.data;
      });
      //更改分类
      $scope.changeCat = function () {
        $state.go('tagsList',{cid:$scope.cid});
      };
      //删除
      $scope.del = function (tag) {
        if(confirm('你确定要删除标签?')) {
          Tags.deleteTag({id:tag._id}).then(function () {
            toaster.pop('success', '', '删除标签' + tag.name + '成功');
          }).then(function () {
            return Tags.getTagList({id:$scope.cid}).then(function(result){
              $scope.tagList = result.data;
            });

          }).catch(function (err) {
            err = err.data.error_msg || '删除标签失败.';
            toaster.pop('error', '', err);  
          });
        }
      };
      //增加
      $scope.add = function (size) {
        var modalAdd = $modal.open({
          templateUrl: 'app/manage_tag/tag_add.html',
          controller: 'ModalAddTagCtrl',
          size: size,
        });

        modalAdd.result.then(function () {
          toaster.pop('success', '', '添加标签成功');
          Tags.getTagList({id:$scope.cid}).then(function(result){
            $scope.tagList = result.data;
          });
        });
      };
      //编辑
      $scope.edit = function (tag) {
        var modalEdit = $modal.open({
          templateUrl: 'app/manage_tag/tag_edit.html',
          controller: 'ModalEditTagCtrl',
          resolve: {
              currentTag: function () {
                  return tag;
              }
          }
        });

        modalEdit.result.then(function () {
          toaster.pop('success', '', '编辑标签成功');
          Tags.getTagList({id:$scope.cid}).then(function(result){
            $scope.tagList = result.data;
          });

        });
      };

    })
    .controller('ModalAddTagCtrl',function ($scope, $modalInstance,Tags,toaster) {
        Tags.getTagCatList().then(function(result){
          $scope.catList = result.data;
        });
        $scope.tag = {
          is_show:false,
          is_index:false,
          sort:1
        };
        $scope.ok = function (form) {
              if(form.$valid){
                Tags.addTag($scope.tag).then(function(){
                    $modalInstance.close();
                }).catch( function(err) {
                  err = err.data.error_msg || '添加标签失败.';
                  toaster.pop('error', '', err); 
                });
              }
        };

        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
    })
    .controller('ModalEditTagCtrl',function ($scope, $modalInstance, Tags, toaster, currentTag) {
      $scope.tag = currentTag;
      Tags.getTagCatList().then(function(result){
        $scope.catList = result.data;
      });

      $scope.ok = function (form) {
            if(form.$valid){
              $scope.tag.cid = $scope.tag.cid._id;
              Tags.updateTag($scope.tag._id,$scope.tag).then(function(){
                  $modalInstance.close();
              }).catch( function(err) {
                err = err.data.error_msg || '更新标签失败.';
                toaster.pop('error', '', err); 
              });
            }
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    });
})();

