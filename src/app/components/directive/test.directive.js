(function () {
 'use strict';

 angular.module('jackblog.directives')
     .directive('email',function(){
         return {
             require: ['ngModel','^?form'],
             link: function(scope, elm, attrs, ctrls) {
                 var EMAIL_REGEXP = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
                 ctrls[0].$parsers.unshift(function(viewValue) {
                     if (EMAIL_REGEXP.test(viewValue)) {
                         // 验证通过
                         ctrls[0].$setValidity('email', true);
                         //ctrls[1].$setValidity('email', true);
                         return viewValue;
                     } else {
                         // 验证不通过 返回 undefined (不会有模型更新)
                         ctrls[0].$setValidity('email', false);
                         //ctrls[1].$setDirty('email', true);
                         //ctrls[1].$setValidity('email', false);
                         return undefined;
                     }
                 });
             }
         };
     })
     //包含中文,数字,英文大小写字母,下划线,@符,空格.
     .directive('nickname',function(){
         return {
             require: 'ngModel',
             link: function(scope, elm, attrs, ctrl) {
                 var NICKNAME_REGEXP = /^[(\u4e00-\u9fa5)0-9a-zA-Z\_\s@]+$/;
                 ctrl.$parsers.unshift(function(viewValue) {
                     if (NICKNAME_REGEXP.test(viewValue)) {
                         // 验证通过
                         ctrl.$setValidity('nickname', true);
                         return viewValue;
                     } else {
                         // 验证不通过 返回 undefined (不会有模型更新)
                         ctrl.$setValidity('nickname', false);
                         return undefined;
                     }
                 });
             }
         };
     });   
})();
