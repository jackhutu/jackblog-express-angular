(function () {
  'use strict';

  angular.module('jackblog.manage')
    .controller('BlogListCtrl', function ($scope,$log,Blog,toaster) {
      //初始数据
      $scope.options = {
        currentPage:1,        //当前页数
        itemsPerPage:15,      //每页显示的条数
        sortName:'publish_time',    //排序项
        sortOrder:false         //升降
      };
      //先择记录数
      $scope.activities =
        [
          5,
          10,
          20,
          40,
          0
        ];
      $scope.changeSort = function(sortName){
        if($scope.options.sortName === sortName){
          $scope.options.sortOrder = !$scope.options.sortOrder;
        }
        $scope.options.sortName = sortName;
      };
      $scope.maxSize = 5;       //分页条最大显示数
      $scope.$watchCollection(
        'options',
        function(newValue, oldValue) {
          doPaging(newValue);
        }
      );

      function doPaging(options) {
        Blog.getBlogList(options).then(function (result) {
          $scope.blogList = result.data;
          $scope.bigTotalItems = result.count;
        });
      }

      //删除博客
      $scope.del = function (blog) {
        if(confirm('你确定要删除这篇博客吗?')) {
          Blog.deleteBlog({id:blog._id}).then(function () {
            toaster.pop('success', '', '删除文章 ' + blog.title + ' 成功');
            doPaging($scope.options);
          }).catch(function (err) {
            err = err.data.error_msg || "删除失败.";
            toaster.pop('error','', err);
          });
        }
      };

    });
})();
