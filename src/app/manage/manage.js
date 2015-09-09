(function () {
  'use strict';

  angular.module('jackblog.manage',[])
    .config(function ($stateProvider) {
      $stateProvider
        .state('blogWrite', {
          url: '/blog_write',
          templateUrl: 'app/manage_blog/blog_write.html',
          controller: 'BlogWriteCtrl',
          onlyAdmin:true
        })
        .state('blogList',{
          url:'/blog_list',
          templateUrl: 'app/manage_blog/blog_list.html',
          controller: 'BlogListCtrl',
          onlyAdmin:true
        })
        .state('blogEdit',{
          url:'/blog_edit/:aid',
          templateUrl: 'app/manage_blog/blog_edit.html',
          controller: 'BlogEditCtrl',
          onlyAdmin:true
        })
        .state('tagsManage',{
          url:'/tags_manage',
          templateUrl:'app/manage_tag/tags_manage.html',
          controller:'TagsManageCtrl',
          onlyAdmin:true
        })
        .state('tagsList',{
          url:'/tags_list/:cid',
          templateUrl:'app/manage_tag/tags_list.html',
          controller:'TagsListCtrl',
          onlyAdmin:true
        })
        .state('userList',{
          url:'/user_list',
          templateUrl:'app/manage_user/user_list.html',
          controller:'UserListCtrl',
          onlyAdmin:true
        });
    });
})();
