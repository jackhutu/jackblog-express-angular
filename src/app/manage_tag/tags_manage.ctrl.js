(function () {
  'use strict';

  angular.module('jackblog.manage')
    .controller('TagsManageCtrl', function ($scope,$modal,Tags,toaster) {
      //获取分类列表
      Tags.getTagCatList().then(function(result){
        $scope.catList = result.data;
      });
      //删除
      $scope.del = function (cat) {
        if(confirm('你确定要删除分类?')) {
          Tags.deleteCat({id:cat._id}).then(function () {
            toaster.pop('success', '', '删除标签' + cat.name + '成功');
          }).then(function () {
            return Tags.getTagCatList().then(function(result){
              $scope.catList = result.data;
            });

          }).catch(function (err) {
            err = err.data.error_msg || '删除标签分类失败.';
            toaster.pop('error', '', err);  
          });
        }
      };
      //增加
      $scope.add = function (size) {
        var modalAdd = $modal.open({
          templateUrl: 'app/manage_tag/tag_cat_add.html',
          controller: 'ModalAddTagCatCtrl',
          size: size,
        });

        modalAdd.result.then(function () {
          toaster.pop('success', '', '添加标签分类成功');
          Tags.getTagCatList().then(function(result){
            $scope.catList = result.data;
          });

        });
      };
      //编辑
      $scope.edit = function (cat) {
        var modalEdit = $modal.open({
          templateUrl: 'app/manage_tag/tag_cat_edit.html',
          controller: 'ModalEditTagCatCtrl',
          resolve: {
              currentCat: function () {
                  return cat;
              }
          }
        });

        modalEdit.result.then(function () {
          toaster.pop('success', '', '编辑标签分类成功');
          Tags.getTagCatList().then(function(result){
            $scope.catList = result.data;
          });

        });
      };

    })
    .controller('ModalAddTagCatCtrl',function ($scope, $modalInstance,Tags,toaster) {
        $scope.cat = {};
        $scope.ok = function (form) {
              if(form.$valid){
                Tags.addTagCat($scope.cat).then(function(){
                    $modalInstance.close();
                }).catch( function(err) {
                  err = err.data.error_msg || '添加标签分类失败.';
                  toaster.pop('error', '', err);  
                });
              }
        };

        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
    })
    .controller('ModalEditTagCatCtrl',function ($scope, $modalInstance, Tags, toaster, currentCat) {
      $scope.cat = currentCat;
      $scope.ok = function (form) {
            if(form.$valid){
              Tags.updateTagCat($scope.cat._id,$scope.cat).then(function(){
                  $modalInstance.close();
              }).catch( function(err) {
                err = err.data.error_msg || '修改标签分类失败.';
                toaster.pop('error', '', err);  
              });
            }
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    });  
})();

