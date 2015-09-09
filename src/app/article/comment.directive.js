(function () {
	'use strict';

	angular.module('jackblog.article')
		.directive('comment',function ($rootScope,Comment,$timeout,$log,toaster,Auth) {
			return {
				restrict:'E',
				templateUrl:'app/article/comment.directive.html',
				replace:true,
				link:function ($scope,elem,attr) {
					$scope.showReply = function (index,username) {
						//判断是否登录.未登录则弹出登录框.
						Auth.isLoggedInAsync(function(loggedIn) {
						  if (loggedIn) {
						    $scope.isReply = !$scope.isReply;
						    $('#replyContent' + index).val('@' + username + ' ');
						    $timeout(function() {
						    	$('#replyContent' + index).focus();
						    }, 0, false);
						  }else{
						    $rootScope.opneSnsModal();
						  }
						});
					};
					//提交回复
					$scope.submitNewReply = function (cid,content,index) {
					  Comment.addNewReply(cid,{content:content}).then(function (result) {
					  	$log.debug(result);
					  	$scope.commentList[index].replys = result.data;
					  	$scope.isReply = !$scope.isReply;
					  }).catch(function (err) {
					  	err = err.data.error_msg || '添加回复失败.';
					  	$log.debug(err);
					  	toaster.pop('error','',err);
					  });
					};
					//删除评论
					$scope.delComment = function (index,cid) {
						if(confirm('删除评论会一起删除它所有回复,你确定要删除吗?')){
							Comment.delComment({id:cid}).then(function () {
								$scope.commentList.splice(index, 1);
								toaster.pop('success','','删除评论成功.');
							}).catch(function (err) {
								err = err.data.error_msg || '删除评论失败.';
								toaster.pop('error','',err);
							});
						}
					};

				}
			};
		});
})();
