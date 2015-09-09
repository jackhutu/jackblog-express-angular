'use strict';
describe('module jackblog.manage',function () {

	var $cookies;
	beforeEach(module('ui.router'));
	beforeEach(module('ngLodash'));
	beforeEach(module('toaster'));
	beforeEach(module('ngCookies'));
	beforeEach(module('ui.bootstrap'));
	beforeEach(module('jackblog.resources'));
	beforeEach(module('jackblog.service'));
	beforeEach(module('jackblog.manage'));
	beforeEach(module('templates'));

	beforeEach(inject(function($injector) {
	  $cookies = $injector.get('$cookies');
	  $cookies.put('token','sldjflsjdfljlsdjfljsldjfljsdjf');
	}));

	describe('blog manage',function () {
		var $httpBackend,mockUser,mockArticle,mockTags,mockCommentList;

		beforeEach(inject(function (_$httpBackend_, _$rootScope_, _$controller_,$templateCache,_Auth_,_toaster_,_$modal_) {
		    $httpBackend = _$httpBackend_;
		    mockUser = $httpBackend.when('GET','/api/users/me')
		    											.respond({_id:'55bf0cc80f5d43056b80a01d',nickname:'jack',role:'admin',email:'test@test.com'});
		   	mockArticle = $httpBackend.when('GET','/api/blog/55b1b134f803378e1b893e04/getBlog')
		   												.respond({data: {_id:'55b1b134f803378e1b893e04',title:'文章标题',content:'文章内容'}});
		   	mockTags = $httpBackend.when('GET','/api/tags/0/getTagList')
		   												.respond({data:[{name:'tag1'},{name:'tag2'}]});
		}));

		describe('BlogEditCtrl',function () {
			var $scope,$rootScope,BlogEditController,stateparams,Auth,toaster,$modal,$state;

			beforeEach(inject(function (_$rootScope_, _$controller_,_Auth_,_toaster_,_$modal_,_$state_) {
			    Auth = _Auth_;
			    toaster = _toaster_;
			    $modal = _$modal_;
			    $rootScope = _$rootScope_;
			    $state = _$state_;
			    $state.reload = function () {};
			    $scope = _$rootScope_.$new();
			    stateparams = {aid:'55b1b134f803378e1b893e04'};
			    BlogEditController = _$controller_('BlogEditCtrl', {
			    		$scope: $scope,$stateParams: stateparams,$state:$state
			    	});
			}));

			it('should return blog init value',function () {
				$httpBackend.flush();
				expect($scope.aid).toBe('55b1b134f803378e1b893e04');
				expect($scope.article.title).toEqual('文章标题');
				expect($scope.tagList).toEqual([{name:'tag1'},{name:'tag2'}]);
			});

			it('should save blog return new blog',function () {
				$httpBackend.flush();

				$httpBackend.expectPUT('/api/blog/55b1b134f803378e1b893e04/updateBlog')
										.respond({success:true,article_id:'55b1b134f803378e1b893e04'});
				spyOn($state,'reload');
				$scope.save(true);
				$httpBackend.flush();
				expect($state.reload).toHaveBeenCalled();
			});


		});

		describe('BlogWriteCtrl',function () {
			var $scope,$rootScope,BlogWriteController,stateparams,Auth,toaster,$modal,$state;

			beforeEach(inject(function (_$rootScope_, _$controller_,_Auth_,_toaster_,_$modal_,_$state_) {
			    Auth = _Auth_;
			    toaster = _toaster_;
			    $modal = _$modal_;
			    $rootScope = _$rootScope_;
			    $state = _$state_;
			    $state.go = function (params) { return params};
			    $scope = _$rootScope_.$new();
			    BlogWriteController = _$controller_('BlogWriteCtrl', {
			    		$scope: $scope,$state:$state
			    	});
			}));

			it('should return blog init value',function () {
				expect($scope.article.content).toBe('');
				$httpBackend.flush();
				expect($scope.tagList).toEqual([{name:'tag1'},{name:'tag2'}]);
			});

			it('should save blog go to blogList',function () {
				$httpBackend.flush();
				$httpBackend.expectPOST('/api/blog/addBlog')
										.respond({success:true,article_id:'55b1b134f803378e1b893e04'});
				spyOn($state,'go');
				$scope.save(1);
				$httpBackend.flush();
				expect($state.go).toHaveBeenCalled();
				expect($state.go).toHaveBeenCalledWith('blogList');
			});


		});

		describe('BlogListCtrl',function () {
			var $scope,$rootScope,BlogListController,stateparams,Auth,$toaster;

			beforeEach(inject(function (_$rootScope_, _$controller_,_Auth_,_toaster_,_$modal_) {
			    Auth = _Auth_;
			    $toaster = _toaster_;
			    $rootScope = _$rootScope_;
			    $scope = _$rootScope_.$new();
			    BlogListController = _$controller_('BlogListCtrl', {
			    		$scope: $scope
			    	});

			    $httpBackend.whenGET('/api/blog/getBlogList?currentPage=1&itemsPerPage=15&sortName=publish_time&sortOrder=false')
			    						.respond({count:2,data:[
			    							{
			    								title:'blog 1',
			    								_id:'55b1b134f803378e1b893e04'
			    							},{
			    								title:'blog 2',
			    								_id:'5666b134f803378e1b889777'
			    							}]})
			}));

			it('should return blog list init value',function () {
				expect($scope.options.currentPage).toBe(1);
				$httpBackend.flush();
				expect($scope.blogList.length).toEqual(2);
				expect($scope.bigTotalItems).toEqual(2);
			});

			it('should delete blog return success',function () {
				$httpBackend.flush();
				$httpBackend.expectDELETE('/api/blog/55b1b134f803378e1b893e04')
										.respond({success:true});
				spyOn(window, 'confirm').and.callFake(function () {
				     return true;
				});
				spyOn($toaster,'pop');
				$scope.del({_id:'55b1b134f803378e1b893e04',title:'blog 1'});
				$httpBackend.flush();
				expect($toaster.pop).toHaveBeenCalled();
				expect($toaster.pop).toHaveBeenCalledWith('success', '', '删除文章 blog 1 成功');
			});
		});
	});

	describe('tags manage',function () {
		var $httpBackend,mockUser,mockTagCats,mockTags,mockCommentList;

		beforeEach(inject(function (_$httpBackend_, _$rootScope_, _$controller_,$templateCache,_Auth_,_toaster_,_$modal_) {
		    $httpBackend = _$httpBackend_;
		    mockUser = $httpBackend.when('GET','/api/users/me')
		    											.respond({_id:'55bf0cc80f5d43056b80a01d',nickname:'jack',role:'admin',email:'test@test.com'});
		   	mockTagCats = $httpBackend.when('GET','/api/tags/getTagCatList')
		   												.respond({data: [{name:'分类1'},{name:'分类2'}]});
		   	mockTags = $httpBackend.when('GET','/api/tags/0/getTagList')
		   												.respond({data:[{name:'tag1'},{name:'tag2'}]});
		}));

		describe('TagsManageCtrl',function () {
			var $scope,$rootScope,TagsManageController,stateparams,Auth,toaster,$modal,$state;

			beforeEach(inject(function (_$rootScope_, _$controller_,_Auth_,_toaster_,_$modal_,_$state_) {
			    Auth = _Auth_;
			    toaster = _toaster_;
			    $modal = _$modal_;
			    $rootScope = _$rootScope_;
			    $state = _$state_;
			    $scope = _$rootScope_.$new();
			    TagsManageController = _$controller_('TagsManageCtrl', {
			    		$scope: $scope
			    });
			}));

			it('should return tag cat init value',function () {
				$httpBackend.flush();
				expect($scope.catList).toEqual([{name:'分类1'},{name:'分类2'}]);
			});

		});

		describe('ModalAddTagCatCtrl',function () {
				var $scope,$rootScope,ModalAddTagCatController,Auth,toaster,$modal,modalInstance;

				beforeEach(inject(function (_$rootScope_, _$controller_,_Auth_,_toaster_,_$modal_) {
				    Auth = _Auth_;
				    toaster = _toaster_;
				    $modal = _$modal_;
				    $rootScope = _$rootScope_;
				    $scope = _$rootScope_.$new();
				    modalInstance = {
				        close: jasmine.createSpy('modalInstance.close'),
				        dismiss: jasmine.createSpy('modalInstance.dismiss'),
				        result: {
				            then: function(confirmCallback, cancelCallback) {
				                //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
				                this.confirmCallBack = confirmCallback;
				                this.cancelCallback = cancelCallback;
				            }
				        }
				    };
				    ModalAddTagCatController = _$controller_('ModalAddTagCatCtrl', {
				    		$scope: $scope, $modalInstance: modalInstance
				    });
				}));

				it('should return cat',function () {
					expect($scope.cat).toEqual({});
				});

				it('should addTagCat return success',function () {
					$httpBackend.expectPOST('/api/tags/addTagCat').respond({
						success:true,cat_id:'57777cc80f5d43056b806666'
					});
					var form = {$valid:true};
					$scope.ok(form);
					$httpBackend.flush();
					expect(modalInstance.close).toHaveBeenCalled();
				});
				it('should return "cancel" response', function () {
				    $scope.cancel();
				    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
				});
		});

		describe('ModalEditTagCatCtrl',function () {
				var $scope,$rootScope,ModalEditTagCatController,Auth,currentCat,toaster,$modal,modalInstance;

				beforeEach(inject(function (_$rootScope_, _$controller_,_Auth_,_toaster_,_$modal_) {
				    Auth = _Auth_;
				    toaster = _toaster_;
				    $modal = _$modal_;
				    $rootScope = _$rootScope_;
				    $scope = _$rootScope_.$new();
				    modalInstance = {
				        close: jasmine.createSpy('modalInstance.close'),
				        dismiss: jasmine.createSpy('modalInstance.dismiss'),
				        result: {
				            then: function(confirmCallback, cancelCallback) {
				                //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
				                this.confirmCallBack = confirmCallback;
				                this.cancelCallback = cancelCallback;
				            }
				        }
				    };
				    currentCat = {
				    	name:'分类名',
				    	_id:'57777cc80f5d43056b806666'
				    };
				    ModalEditTagCatController = _$controller_('ModalEditTagCatCtrl', {
				    		$scope: $scope, $modalInstance: modalInstance,currentCat:currentCat
				    });
				}));

				it('should return tags init value',function () {
					expect($scope.cat.name).toEqual('分类名');
				});

				it('should updateTagCat return success',function () {
					$httpBackend.expectPUT('/api/tags/57777cc80f5d43056b806666/updateTagCat').respond({
						success:true,cat_id:'57777cc80f5d43056b806666'
					});
					var form = {$valid:true};
					$scope.ok(form);
					$httpBackend.flush();
					expect(modalInstance.close).toHaveBeenCalled();
				});

				it('should return "cancel" response', function () {
				    $scope.cancel();
				    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
				});

		});


		describe('TagsListCtrl',function () {
			var $scope,$rootScope,TagsListController,stateparams,Auth,toaster,$modal,$state;

			beforeEach(inject(function (_$rootScope_, _$controller_,_Auth_,_toaster_,_$modal_,_$state_) {
			    Auth = _Auth_;
			    toaster = _toaster_;
			    $modal = _$modal_;
			    $rootScope = _$rootScope_;
			    $state = _$state_;
			    $scope = _$rootScope_.$new();
			    TagsListController = _$controller_('TagsListCtrl', {
			    		$scope: $scope
			    });
			}));

			it('should return tags init value',function () {
				$httpBackend.flush();
				expect($scope.catList).toEqual([{name:'分类1'},{name:'分类2'}]);
				expect($scope.tagList).toEqual([{name:'tag1'},{name:'tag2'}]);
			});
		});

		describe('ModalAddTagCtrl',function () {
				var $scope,$rootScope,ModalAddTagController,Auth,toaster,$modal,modalInstance;

				beforeEach(inject(function (_$rootScope_, _$controller_,_Auth_,_toaster_,_$modal_) {
				    Auth = _Auth_;
				    toaster = _toaster_;
				    $modal = _$modal_;
				    $rootScope = _$rootScope_;
				    $scope = _$rootScope_.$new();
				    modalInstance = {
				        close: jasmine.createSpy('modalInstance.close'),
				        dismiss: jasmine.createSpy('modalInstance.dismiss'),
				        result: {
				            then: function(confirmCallback, cancelCallback) {
				                //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
				                this.confirmCallBack = confirmCallback;
				                this.cancelCallback = cancelCallback;
				            }
				        }
				    };
				    ModalAddTagController = _$controller_('ModalAddTagCtrl', {
				    		$scope: $scope, $modalInstance: modalInstance
				    });
				}));

				it('should return tags init value',function () {
					$httpBackend.flush();
					expect($scope.catList).toEqual([{name:'分类1'},{name:'分类2'}]);
				});

				it('should addTag return success',function () {
					$httpBackend.expectPOST('/api/tags/addTag').respond({
						success:true,tag_id:'55990cc80f5d43056b800009'
					});
					var form = {$valid:true};
					$scope.ok(form);
					$httpBackend.flush();
					expect(modalInstance.close).toHaveBeenCalled();
				});
				it('should return "cancel" response', function () {
				    $scope.cancel();
				    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
				});
		});

		describe('ModalEditTagCtrl',function () {
				var $scope,$rootScope,ModalEditTagController,Auth,currentTag,toaster,$modal,modalInstance;

				beforeEach(inject(function (_$rootScope_, _$controller_,_Auth_,_toaster_,_$modal_) {
				    Auth = _Auth_;
				    toaster = _toaster_;
				    $modal = _$modal_;
				    $rootScope = _$rootScope_;
				    $scope = _$rootScope_.$new();
				    modalInstance = {
				        close: jasmine.createSpy('modalInstance.close'),
				        dismiss: jasmine.createSpy('modalInstance.dismiss'),
				        result: {
				            then: function(confirmCallback, cancelCallback) {
				                //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
				                this.confirmCallBack = confirmCallback;
				                this.cancelCallback = cancelCallback;
				            }
				        }
				    };
				    currentTag = {
				    	name:'tag name',
				    	_id:'55990cc80f5d43056b800009',
				    	cid:{
				    		_id:'56666cc80f5d43056b80888',
				    		name:'language'
				    	}
				    };
				    ModalEditTagController = _$controller_('ModalEditTagCtrl', {
				    		$scope: $scope, $modalInstance: modalInstance,currentTag:currentTag
				    });
				}));

				it('should return tags init value',function () {
					$httpBackend.flush();
					expect($scope.catList).toEqual([{name:'分类1'},{name:'分类2'}]);
				});

				it('should updateTag return success',function () {
					$httpBackend.expectPUT('/api/tags/55990cc80f5d43056b800009/updateTag').respond({
						success:true,tag_id:'55990cc80f5d43056b800009'
					});
					var form = {$valid:true};
					$scope.ok(form);
					$httpBackend.flush();
					expect(modalInstance.close).toHaveBeenCalled();
				});
				it('should return "cancel" response', function () {
				    $scope.cancel();
				    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
				});
		});

	});



	describe('users manage',function () {
		var $httpBackend,mockUser,mockUserList;

		beforeEach(inject(function (_$httpBackend_, _$rootScope_, _$controller_,$templateCache,_Auth_,_toaster_,_$modal_) {
		    $httpBackend = _$httpBackend_;
		    mockUser = $httpBackend.when('GET','/api/users/me')
		    											.respond({_id:'55bf0cc80f5d43056b80a01d',nickname:'jack',role:'admin',email:'test@test.com'});
		   	mockUserList = $httpBackend.when('GET','/api/users/getUserList')
		   												.respond({count:2,data:[{nickname:'user1'},{nickname:'user2'}]});
		}));

		describe('UserListCtrl',function () {
			var $scope,$rootScope,UserListController,stateparams,Auth,toaster,$modal,$state;

			beforeEach(inject(function (_$rootScope_, _$controller_,_Auth_,_toaster_,_$modal_,_$state_) {
			    Auth = _Auth_;
			    toaster = _toaster_;
			    $modal = _$modal_;
			    $rootScope = _$rootScope_;
			    $state = _$state_;
			    $scope = _$rootScope_.$new();
			    UserListController = _$controller_('UserListCtrl', {
			    		$scope: $scope
			    });
			}));

			it('should return users init value',function () {
				$httpBackend.flush();
				expect($scope.userList.length).toEqual(2);
				expect($scope.bigTotalItems).toEqual(2);
			});

		});


		describe('ModalAddUserCtrl',function () {
				var $scope,$rootScope,ModalAddUserController,Auth,toaster,$modal,modalInstance;

				beforeEach(inject(function (_$rootScope_, _$controller_,_Auth_,_toaster_,_$modal_) {
				    Auth = _Auth_;
				    toaster = _toaster_;
				    $modal = _$modal_;
				    $rootScope = _$rootScope_;
				    $scope = _$rootScope_.$new();
				    modalInstance = {
				        close: jasmine.createSpy('modalInstance.close'),
				        dismiss: jasmine.createSpy('modalInstance.dismiss'),
				        result: {
				            then: function(confirmCallback, cancelCallback) {
				                //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
				                this.confirmCallBack = confirmCallback;
				                this.cancelCallback = cancelCallback;
				            }
				        }
				    };
				    ModalAddUserController = _$controller_('ModalAddUserCtrl', {
				    		$scope: $scope, $modalInstance: modalInstance
				    });
				}));

				it('should return user init value',function () {
					$httpBackend.flush();
					expect($scope.user).toEqual({});
				});

				it('should addUser return success',function () {
					$httpBackend.expectPOST('/api/users/addUser').respond({
						success:true,user_id:'58888cc80f5d43056b800555'
					});
					var form = {$valid:true};
					$scope.ok(form);
					$httpBackend.flush();
					expect(modalInstance.close).toHaveBeenCalled();
				});
				it('should return "cancel" response', function () {
				    $scope.cancel();
				    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
				});
		});

		describe('ModalEditUserCtrl',function () {
				var $scope,$rootScope,ModalEditUserController,Auth,currentUser,toaster,$modal,modalInstance;

				beforeEach(inject(function (_$rootScope_, _$controller_,_Auth_,_toaster_,_$modal_) {
				    Auth = _Auth_;
				    toaster = _toaster_;
				    $modal = _$modal_;
				    $rootScope = _$rootScope_;
				    $scope = _$rootScope_.$new();
				    modalInstance = {
				        close: jasmine.createSpy('modalInstance.close'),
				        dismiss: jasmine.createSpy('modalInstance.dismiss'),
				        result: {
				            then: function(confirmCallback, cancelCallback) {
				                //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
				                this.confirmCallBack = confirmCallback;
				                this.cancelCallback = cancelCallback;
				            }
				        }
				    };
				    currentUser = {
				    	nickname:'jack',
				    	_id:'58888cc80f5d43056b800555'
				    };
				    ModalEditUserController = _$controller_('ModalEditUserCtrl', {
				    		$scope: $scope, $modalInstance: modalInstance,currentUser:currentUser
				    });
				}));

				it('should return tags init value',function () {
					$httpBackend.flush();
					expect($scope.currentUser.nickname).toEqual('jack');
				});

				it('should updateUser return success',function () {
					$httpBackend.expectPUT('/api/users/58888cc80f5d43056b800555/updateUser').respond({
						success:true,tag_id:'58888cc80f5d43056b800555'
					});
					var form = {$valid:true};
					$scope.ok(form);
					$httpBackend.flush();
					expect(modalInstance.close).toHaveBeenCalled();
				});
				it('should return "cancel" response', function () {
				    $scope.cancel();
				    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
				});
		});

	});
});


