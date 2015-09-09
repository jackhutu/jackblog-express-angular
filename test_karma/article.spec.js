'use strict';
describe('module jackblog.article',function () {

	var $cookies,$httpBackend,mockUser,mockArticle,mockGetPrenext,mockCommentList;
	beforeEach(module('ui.router'));
	beforeEach(module('ngLodash'));
	beforeEach(module('toaster'));
	beforeEach(module('ngCookies'));
	beforeEach(module('ui.bootstrap'));
	beforeEach(module('jackblog.resources'));
	beforeEach(module('jackblog.service'));
	beforeEach(module('jackblog.article'));
	beforeEach(module('templates'));

	beforeEach(inject(function($injector) {
	  $cookies = $injector.get('$cookies');
	  $cookies.put('token','sldjflsjdfljlsdjfljsldjfljsdjf');
	}));

	beforeEach(inject(function (_$httpBackend_, _$rootScope_, _$controller_,$templateCache,_Auth_,_toaster_,_$modal_) {
	    $httpBackend = _$httpBackend_;
	    //$templateCache.put('app/article/article.html', '<div>article content</div>'); 
	    localStorage.removeItem('options');

	    mockArticle = $httpBackend.when('GET', '/api/blog/55b1b134f803378e1b893e04/getFrontArticle')
	    													.respond({data: {title:'文章标题',content:'文章内容'}});
	    mockGetPrenext = $httpBackend.when('GET','/api/blog/55b1b134f803378e1b893e04/getPrenext?sortName=publish_time&tagId=')
	    													.respond({data:{prev:{
	    														title:'上一篇文章'
	    													},next:{
	    														title:'下一篇文章'
	    													}}});

	    mockCommentList = $httpBackend.when('GET','/api/comment/55b1b134f803378e1b893e04/getFrontCommentList')
	    													.respond({data:[{
	    														content:'评论1'
	    													},{
	    														content:'评论2'
	    													}]});
	    mockUser = $httpBackend.when('GET','/api/users/me')
	    											.respond({_id:'55bf0cc80f5d43056b80a01d',nickname:'jack',role:'admin',email:'test@test.com'});
	}));

	describe('acticle controller',function () {
		var $scope,$rootScope,ArticleController,stateparams,Auth,toaster,$modal;

		beforeEach(inject(function (_$rootScope_, _$controller_,_Auth_,_toaster_,_$modal_) {
		    Auth = _Auth_;
		    toaster = _toaster_;
		    $modal = _$modal_;
		    $rootScope = _$rootScope_;
		    $rootScope.opneSnsModal = function () {
		    }
		    $scope = _$rootScope_.$new();
		    stateparams = {aid:'55b1b134f803378e1b893e04'};
		    ArticleController = _$controller_('ArticleCtrl', {
		    		$scope: $scope,$rootScope:$rootScope,$stateParams: stateparams
		    	});
		}));
		
	
		it('should article init value',function () {

			expect($scope.aid).toBe('55b1b134f803378e1b893e04');
			$httpBackend.flush();
			expect($scope.isAdmin()).toBeTruthy();
			expect($scope.isLoggedIn()).toBeTruthy();
			expect($scope.article).toEqual({title:'文章标题',content:'文章内容'});
			expect($scope.next).toEqual({title:'下一篇文章'});
			expect($scope.prev).toEqual({title:'上一篇文章'});
			expect($scope.commentList).toEqual([{content:'评论1'},{content:'评论2'}]);
			expect($scope.isLike).toBeFalsy();
		});

		it('should submitNewComment return success',function () {
			$httpBackend.expectPOST('/api/comment/addNewComment')
									.respond({success:true,data:{content:'新评论.'}});

			$scope.submitNewComment('55b481acea53ce8b2a6dadc5');
			$httpBackend.flush();
			expect($scope.commentList).toEqual([{content:'评论1'},{content:'评论2'},{content:'新评论.'}]);

		});

		it('should submitNewComment return error',function () {
			spyOn(toaster, 'pop');
			$httpBackend.expectPOST('/api/comment/addNewComment')
									.respond(403,'');

			$scope.submitNewComment('55b481acea53ce8b2a6dadc5');
			$httpBackend.flush();
			expect(toaster.pop).toHaveBeenCalled();
		});
		it('should toggleLike return success',function () {
			$httpBackend.expectPUT('/api/blog/55b481acea53ce8b2a6dadc5/toggleLike')
									.respond({success:true,count:22,isLike:true});
			$scope.toggleLike('55b481acea53ce8b2a6dadc5');
			$httpBackend.flush();
			expect($scope.article.like_count).toEqual(22);
			expect($scope.isLike).toBeTruthy();
		});

		it('should goToComment return open sns modal',function () {
			$scope.goToComment();
			Auth.isLoggedInAsync = function (cb) {
				return cb(false);
			}

			spyOn($rootScope, 'opneSnsModal');
			$scope.goToComment();
			expect($rootScope.opneSnsModal).toHaveBeenCalled();

		});

		it('should toggleLike return open sns modal',function () {
			Auth.isLoggedInAsync = function (cb) {
				return cb(false);
			}
			$rootScope.opneSnsModal = function () {
			}
			spyOn($rootScope, 'opneSnsModal');
			$scope.toggleLike('55b481acea53ce8b2a6dadc5');
			expect($rootScope.opneSnsModal).toHaveBeenCalled();

		});
	});

	describe('comment directive',function () {
		var compile,$scope,$rootScope,directiveElem,$window,toaster,Auth;
		beforeEach(inject(function ($compile, _$rootScope_,_$window_,_toaster_,_Auth_) {
			compile = $compile;
			$window = _$window_;
			toaster = _toaster_;
			Auth = _Auth_;
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			directiveElem = getCompiledElement();
		}));

		function getCompiledElement(){
		  var element = angular.element('<comment></comment>');
		  var compiledElement = compile(element)($scope);
		  $scope.$digest();
		  return compiledElement;
		}

		it('should has reply element',function () {
			var replyElement = directiveElem.find('reply');
			expect(replyElement).toBeDefined();
		});

		it('should show reply text',function () {
			$scope.isReply = false;
			Auth.isLoggedInAsync = function (cb) {
				return cb(true);
			}
			$scope.showReply(0,'jack');
			expect($scope.isReply).toBeTruthy();	
		});

		it('should submitNewReply return new replys',function () {
			$httpBackend.expectPOST('/api/comment/55bf7fb490ee32e5792713e4/addNewReply').respond({
				success:true,data:[{content:'回复内容'}]
			})
			$scope.commentList = [{
				content:'1评论',
				replys:[]
			}];
			$scope.submitNewReply('55bf7fb490ee32e5792713e4','回复内容',0);
			$httpBackend.flush();
			expect($scope.commentList[0].replys.length).toBeGreaterThan(0);

		});

		it('should submitNewReply return error_msg',function() {
			$httpBackend.expectPOST('/api/comment/55bf7fb490ee32e5792713e4/addNewReply').respond(403,'');

			spyOn(toaster,'pop');
			
			$scope.submitNewReply('55bf7fb490ee32e5792713e4','回复内容',0);
			$httpBackend.flush();
			expect(toaster.pop).toHaveBeenCalled();
		});


		it('should delComment return success',function () {
			$httpBackend.expectDELETE('/api/comment/55bf7fb490ee32e5792713e4').respond({
				success:true
			});
			$scope.commentList = [{
				content:'1评论',
				replys:[]
			}];
			spyOn($window, 'confirm').and.callFake(function () {
			     return true;
			});
			$scope.delComment(0,'55bf7fb490ee32e5792713e4');
			$httpBackend.flush();
			expect($scope.commentList.length).toEqual(0);

		});

		it('should delComment return error_msg',function() {
			$httpBackend.expectDELETE('/api/comment/55bf7fb490ee32e5792713e4').respond(403,'');
			spyOn($window, 'confirm').and.callFake(function () {
			     return true;
			});
			spyOn(toaster,'pop');
			
			$scope.delComment(0,'55bf7fb490ee32e5792713e4');
			$httpBackend.flush();
			expect(toaster.pop).toHaveBeenCalled();
		});

	});

	describe('reply directive',function () {
		var compile,$scope,directiveElem,$window,toaster;
		beforeEach(inject(function ($compile, $rootScope,_$window_,_toaster_) {
			compile = $compile;
			$window = _$window_;
			toaster = _toaster_;
			$scope = $rootScope.$new();
			directiveElem = getCompiledElement();
		}));

		function getCompiledElement(){
		  var element = angular.element('<reply></reply>');
		  var compiledElement = compile(element)($scope);
		  $scope.$digest();
		  return compiledElement;
		}

		it('should delReply return success',function () {
			$httpBackend.expectPUT('/api/comment/55bf7fb490ee32e5792713e4/delReply').respond({
				success:true,data:{content:'1评论'}
			});
			spyOn($window, 'confirm').and.callFake(function () {
			     return true;
			});
			$scope.commentList = [{
				content:'1评论',
				replys:['1回复']
			}];

			$scope.delReply('55bf81419749db327c321e78','55bf7fb490ee32e5792713e4',0);
			$httpBackend.flush();
			expect($scope.commentList[0].replys).toBeUndefined();
			expect($scope.commentList[0].content).toBe('1评论');
		});

		it('should delReply return error_msg',function() {
			$httpBackend.expectPUT('/api/comment/55bf7fb490ee32e5792713e4/delReply').respond(403,'');
			spyOn($window, 'confirm').and.callFake(function () {
			     return true;
			});
			spyOn(toaster,'pop');

			$scope.delReply('55bf81419749db327c321e78','55bf7fb490ee32e5792713e4',0);
			$httpBackend.flush();
			expect(toaster.pop).toHaveBeenCalled();
		});

	});
});


