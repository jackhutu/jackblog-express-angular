(function () {
	'use strict';

	angular.module('jackblog.resources')
		.factory('Tags', function($resource){
			var tagsResource = $resource('/api/tags/:id/:controller', {
					id: '@_id'
				},
				{
					//添加标签分类
					addTagCat:{
						method: 'POST',
						params: {
						  id:'addTagCat'
						}
					},
					getTagCatList: {
					  method: 'GET',
					  params: {
					    id:'getTagCatList'
					  }
					},
					updateTagCat:{
						method: 'PUT',
						params:{
							controller: 'updateTagCat'
						}
					},
					getTagList:{
						method: 'GET',
						params: {
						  controller:'getTagList'
						}
					},
					addTag:{
						method: 'POST',
						params: {
						  id:'addTag'
						}
					},
					deleteTag:{
						method:'DELETE',
						params:{
							controller:'deleteTag'
						}
					},
					updateTag:{
						method: 'PUT',
						params:{
							controller: 'updateTag'
						}
					},
					//前台数据
					getFrontTagList:{
						method:'GET',
						params:{
							id:'getFrontTagList'
						}
					}
				});

			return {
			  addTagCat: function(data,callback){
			    var cb = callback || angular.noop;
			    return tagsResource.addTagCat(data,function(result) {
			      return cb(result);
			    }, function(err) {
			      return cb(err);
			    }).$promise;
			  },
			  getTagCatList:function (callback) {
			    var cb = callback || angular.noop;
			    return tagsResource.getTagCatList(function(result) {
			      return cb(result);
			    }, function(err) {
			      return cb(err);
			    }).$promise;
			  },
			  updateTagCat:function (id,data,callback) {
			    var cb = callback || angular.noop;
			    return tagsResource.updateTagCat({id:id},data,function(result) {
			      return cb(result);
			    }, function(err) {
			      return cb(err);
			    }).$promise;
			  },
			  deleteCat:function(data,callback){
			    var cb = callback || angular.noop;
			    return tagsResource.remove(data,function(result) {
			      return cb(result);
			    }, function(err) {
			      return cb(err);
			    }).$promise;
			  },
			  getTagList:function (data,callback) {
			    var cb = callback || angular.noop;
			    return tagsResource.getTagList(data,function(result) {
			      return cb(result);
			    }, function(err) {
			      return cb(err);
			    }).$promise;
			  },
			  addTag:function (data,callback) {
			    var cb = callback || angular.noop;
			    return tagsResource.addTag(data,function(result) {
			      return cb(result);
			    }, function(err) {
			      return cb(err);
			    }).$promise;

			  },
			  deleteTag:function(data,callback){
			    var cb = callback || angular.noop;
			    return tagsResource.deleteTag(data,function(result) {
			      return cb(result);
			    }, function(err) {
			      return cb(err);
			    }).$promise;
			  },
			  updateTag:function (id,data,callback) {
			    var cb = callback || angular.noop;
			    return tagsResource.updateTag({id:id},data,function(result) {
			      return cb(result);
			    }, function(err) {
			      return cb(err);
			    }).$promise;

			  },
			  //前台数据
			  getFrontTagList:function (callback) {
			    var cb = callback || angular.noop;
			    return tagsResource.getFrontTagList(function(result) {
			      return cb(result);
			    }, function(err) {
			      return cb(err);
			    }).$promise;
			  }
			};
		});
})();
