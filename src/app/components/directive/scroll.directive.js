(function () {
   'use strict';

   angular.module('jackblog.directives')
       .directive('scrolltop',function ($window) {
           return {
               restrict:'EA',
               replace:true,
               template:'<div class="gotop" ng-show="isShowTop">' +
                   '<i class="fa fa-arrow-up"></i>'+
                   '</div>',
               link:function (scope, element, attrs) {
                   scope.isShowTop = false;
                   var el = $('html,body');
                   element.bind('click',function () {
                    //防止多次点击
                    if($(window).scrollTop() !== 0 && !el.is(':animated')){
                      el.animate({
                          scrollTop: 0
                      }, 'slow');
                    }
                   });
                   angular.element($window).bind("scroll", function() {
                        if (this.pageYOffset >= 200) {
                           scope.isShowTop = true;
                        } else {
                           scope.isShowTop = false;
                        }
                       scope.$apply();
                   });
               }
           };
       }); 
})();

