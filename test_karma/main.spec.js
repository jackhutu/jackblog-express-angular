'use strict';

describe('jackblog',function () {
	beforeEach(module('jackblog'));
	beforeEach(module('templates'));

	var $httpBackend,mockTagsList,mockBlogCount,mockUser,mockBlogList;

	beforeEach(inject(function (_$httpBackend_, _$rootScope_, _$controller_,$templateCache) {
	    $httpBackend = _$httpBackend_;
	    //$templateCache.put('app/main/main.html', '<div>main content</div>');
	    localStorage.removeItem('options');

	    $httpBackend.when('GET', '/api/blog/getIndexImage')
	    						.respond({success:true,img:'http://upload.jackhu.top/blog/index/8x7hVJvpE3Z6ruwgtd2G.jpg'});
	    mockTagsList = $httpBackend.when('GET', '/api/tags/getFrontTagList')
	    													.respond({data: [{name:'nodejs'}]});
	    mockBlogCount = $httpBackend.when('GET','/api/blog/getFrontBlogCount?currentPage=1&itemsPerPage=10&sortName=publish_time&tagId=')
	    													.respond({success:true,count:2});
	    mockBlogList = $httpBackend.when('GET','/api/blog/getFrontBlogList?currentPage=1&itemsPerPage=10&sortName=publish_time&tagId=')
	    													.respond({data:[{
	    														title:'文章1'
	    													},{
	    														title:'文章2',
	    													}]});
	    mockUser = $httpBackend.when('GET','/api/users/me')
	    											.respond({nickname:'jack',role:'admin',email:'test@test.com'});
	}));
	afterEach(function() {
	    $httpBackend.verifyNoOutstandingExpectation();
	    $httpBackend.verifyNoOutstandingRequest();
	});

	describe('footer controller', function() {
		var $scope,FooterCtrl;

		beforeEach(inject(function (_$controller_,_$rootScope_) {
			$scope = _$rootScope_.$new();
			FooterCtrl = _$controller_('FooterCtrl',{$scope:$scope});
		}));

		it('should return beian number',function () {
			$httpBackend.flush();
			expect($scope.beian).toMatch(/鄂ICP备15010989号-1/);
		});
	});

	describe('sidebar controller', function() {
		var $scope,SidebarCtrl;

		beforeEach(inject(function (_$controller_,_$rootScope_) {
			$scope = _$rootScope_.$new();
			SidebarCtrl = _$controller_('SidebarCtrl',{$scope:$scope});
		}));

		it('should return my name',function () {
			$httpBackend.flush();
			expect($scope.name).toBe('Jack Hu');
		});
	});

	describe('navbar controller',function () {

		var $scope,NavbarCtrl;

		beforeEach(inject(function (_$httpBackend_, _$rootScope_, _$controller_) {
		    $scope = _$rootScope_.$new();
		    NavbarCtrl = _$controller_('NavbarCtrl', {$scope: $scope});
		}));

		it('should get tag and blog list return init value', function() {

		  expect($scope.isLoggedIn()).toBeFalsy();
		  expect($scope.isAdmin()).toBeFalsy();
		  $httpBackend.flush();
		  expect($scope.isLoggedIn()).toBeTruthy();
		  expect($scope.isAdmin()).toBeTruthy();
		  expect($scope.getCurrentUser().nickname).toEqual('jack');

		});

	});	

	describe('main controller',function () {

		var $scope,MainController;

		beforeEach(inject(function (_$httpBackend_, _$rootScope_, _$controller_) {
		    $scope = _$rootScope_.$new();
		    MainController = _$controller_('MainCtrl', {$scope: $scope});
		}));

		it('should main init return init value', function() {

		  expect($scope.blogList.length).toEqual(0);
		  expect($scope.isLoading).toBeTruthy();

		  $httpBackend.flush();
		  expect($scope.tagList[0].name).toEqual('nodejs');
		  expect($scope.blogCount).toEqual(2);
		  expect($scope.blogList).toEqual([{title:'文章1'},{title:'文章2',}]);
		  expect($scope.isLoading).toBeFalsy();

		});

		it('should get tag and blog list return error', function() {
			$httpBackend.expectGET('/api/blog/getFrontBlogList?currentPage=1&itemsPerPage=10&sortName=publish_time&tagId=')
				    			.respond(403,'');

		  expect($scope.blogList.length).toEqual(0);
		  expect($scope.isLoading).toBeTruthy();

		  $httpBackend.flush();
		  expect($scope.blogList.length).toEqual(0);
		  expect($scope.isLoading).toBeFalsy();

		});

		it('should loadMore return new blog list', function() {
			$httpBackend.expectGET('/api/blog/getFrontBlogCount?currentPage=2&itemsPerPage=10&sortName=publish_time&tagId=')
				    													.respond({success:true,count:2});
			$httpBackend.expectGET('/api/blog/getFrontBlogList?currentPage=2&itemsPerPage=10&sortName=publish_time&tagId=')
				    													.respond({data:[{
				    														title:'文章11'
				    													},{
				    														title:'文章12',
				    													}]});

			$scope.loadMore();
		  expect($scope.isLoading).toBeTruthy();

		  $httpBackend.flush();
		  expect($scope.blogList).toEqual([{title:'文章1'},{title:'文章2',},{title:'文章11'},{title:'文章12',}]);
		  expect($scope.isLoading).toBeFalsy();

		});

		it('should changeSort return new blog list', function() {
			$httpBackend.expectGET('/api/blog/getFrontBlogCount?currentPage=1&itemsPerPage=10&sortName=visit_count&tagId=')
				    			.respond({success:true,count:2});
			$httpBackend.expectGET('/api/blog/getFrontBlogList?currentPage=1&itemsPerPage=10&sortName=visit_count&tagId=')
				    			.respond({data:[{title:'文章2'},{title:'文章1',}]});

			$scope.changeSort('visit_count');
		  expect($scope.isLoading).toBeTruthy();

		  $httpBackend.flush();
		  expect($scope.blogList).toEqual([{title:'文章2'},{title:'文章1',}]);
		  expect($scope.isLoading).toBeFalsy();

		});

		it('should changeTag return new blog list', function() {

			$httpBackend.expectGET('/api/blog/getFrontBlogCount?currentPage=1&itemsPerPage=10&sortName=&tagId=55b0c23aa463e6742c3030ea')
									.respond({success:true,count:2});
			$httpBackend.expectGET('/api/blog/getFrontBlogList?currentPage=1&itemsPerPage=10&sortName=&tagId=55b0c23aa463e6742c3030ea')
									.respond({data:[{title:'文章4'},{title:'文章5',}]});


			$scope.changeTag('55b0c23aa463e6742c3030ea');
			expect($scope.options.tagId).toBe('55b0c23aa463e6742c3030ea');
			expect($scope.options.sortName).toBe('');
		  expect($scope.isLoading).toBeTruthy();

		  $httpBackend.flush();
		  expect($scope.blogList).toEqual([{title:'文章4'},{title:'文章5',}]);
		  expect($scope.isLoading).toBeFalsy();

		});
	});
});
