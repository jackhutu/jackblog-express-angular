'use strict';
describe('module jackblog.settings',function () {

	//var $cookies;
	beforeEach(module('ui.router'));
	beforeEach(module('ngLodash'));
	beforeEach(module('toaster'));
	beforeEach(module('ngCookies'));
	beforeEach(module('ui.bootstrap'));
	beforeEach(module('jackblog.resources'));
	beforeEach(module('jackblog.service'));
	beforeEach(module('jackblog.settings'));
	beforeEach(module('templates'));

		describe('LocalSignInCtrl',function () {
			var $scope,$httpBackend,$rootScope,LocalSignInController,Auth,toaster,$modal,$state;

			beforeEach(inject(function (_$rootScope_,_$httpBackend_, _$controller_,_Auth_,_toaster_,_$modal_,_$state_) {
			    Auth = _Auth_;
			    $httpBackend = _$httpBackend_;
			    toaster = _toaster_;
			    $modal = _$modal_;
			    $rootScope = _$rootScope_;
			    $state = _$state_;
			    $scope = _$rootScope_.$new();
			    LocalSignInController = _$controller_('LocalSignInCtrl', {
			    		$scope: $scope
			    	});
			}));

			it('should return user init value',function () {
				expect($scope.user).toEqual({});
			});

		});

		describe('SettingCtrl',function () {
			var $scope,$httpBackend,$cookies,$rootScope,SettingController,Auth,mockUser,toaster,$modal,$state;
			beforeEach(inject(function($injector) {
			  $cookies = $injector.get('$cookies');
			  $cookies.put('token','sldjflsjdfljlsdjfljsldjfljsdjf');
			}));

			beforeEach(inject(function (_$rootScope_,_$httpBackend_, _$controller_,_Auth_,_toaster_,_$modal_,_$state_) {
			    Auth = _Auth_;
			    $httpBackend = _$httpBackend_;
			    toaster = _toaster_;
			    $modal = _$modal_;
			    $rootScope = _$rootScope_;
			    $state = _$state_;
			    $scope = _$rootScope_.$new();
			    SettingController = _$controller_('SettingCtrl', {
			    		$scope: $scope
			    	});

			    mockUser = $httpBackend.when('GET','/api/users/me')
			    											.respond({_id:'55bf0cc80f5d43056b80a01d',nickname:'jack',role:'admin',email:'test@test.com'});
			    
			}));

			it('should return user init value',function () {
				$httpBackend.flush();
				expect($scope.user._id).toBe('55bf0cc80f5d43056b80a01d');
			});
			it('should mdUser return success',function () {
				$httpBackend.flush();
				$httpBackend.expectPUT('/api/users/mdUser')
									.respond({success:true,data:{_id:'55bf0cc80f5d43056b80a01d',nickname:'jack hu'}});
				var form = {
					$valid:true
				}
				$scope.mdUser(form);
				$httpBackend.flush();
				expect($scope.user.nickname).toBe('jack hu');
			});
		});




});


