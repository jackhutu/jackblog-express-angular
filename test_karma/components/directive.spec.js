'use strict';

describe('module jackblog.directives', function() {
	beforeEach(module('jackblog.directives'));
	beforeEach(module('templates'));

	var compile, scope, directiveElem;
  beforeEach(inject(function ($compile, $rootScope) {
  	compile = $compile;
  	scope = $rootScope.$new();
  	directiveElem = getCompiledElement();
  }));

	function getCompiledElement(template){
	  var compiledDirective = compile(angular.element(template))(scope);
	  scope.$digest();
	  return compiledDirective;
	}

	describe('email directive',function () {
		it('should fail if ngModel is not specified', function () {
		    expect(function(){
		        getCompiledElement('<input type="text" email />');
		    }).toThrow();
		});
		it('should work if ng-model is specified and not wrapped in form', function () {
		    expect(function(){
		        getCompiledElement('<div><input type="text" ng-model="email" email /></div>');
		    }).not.toThrow();
		});

		// it('should set form dirty', function () {
		// 	scope.email = 'test';
		//   var directiveElem = getCompiledElement('<form name="sampleForm"><input type="text" name="email" ng-model="email" email /></form>');
		//   console.log(scope.sampleForm.email);
		//   expect(scope.sampleForm.email.$invalid).toEqual(true);
		// });
	});


	describe('nickname directive',function () {
		it('should fail if ngModel is not specified', function () {
		    expect(function(){
		        getCompiledElement('<input type="text" nickname />');
		    }).toThrow();
		});

		it('should work if ng-model is specified and not wrapped in form', function () {
		    expect(function(){
		        getCompiledElement('<div><input type="text" ng-model="nickname" nickname /></div>');
		    }).not.toThrow();
		});

	});

	describe('scrolltop directive',function () {
		it('should have replaced directive element', function () {
		  var compiledDirective = compile(angular.element('<div><scrolltop></scrolltop></div>'))(scope);
		  scope.$digest();

		  expect(compiledDirective.find('scrolltop').length).toEqual(0);
		});
	});

	
});