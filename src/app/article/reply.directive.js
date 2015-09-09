(function () {
	'use strict';

	angular.module('jackblog.article')
		.directive('reply',function (Comment,$log,toaster) {
			return {
				restrict:'EA',
				templateUrl:'app/article/reply.directive.html',
				replace:true,
				link:function ($scope,elem,attr) {
					//删除回复
					$scope.delReply = function (rid,cid,parentIndex) {
						if(confirm('你确定要删除这条回复吗?')){
							Comment.delReply(cid,{rid:rid}).then(function (result) {
								$log.debug(result);
								$scope.commentList[parentIndex] = result.data;
							}).catch(function (err) {
								err = err.data.error_msg || '删除回复失败.';
								toaster.pop('error','',err);
							});
						}
					};
				}
			};
		});
})();
