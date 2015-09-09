(function () {
   'use strict';

   angular.module('jackblog.directives')
       .directive('markdowneditor',function () {
           return {
               restrict:'A',
               replace:false,
               link:function (scope, element, attrs) {
                    // var md = window.markdownit('commonmark',{
                    //  html: true,
                    //  linkify: true,
                    //  typographer: true,
                    //  breaks:true
                    // });
                    var md = window.markdownit();
                    md.toHTML = md.render;
                    window.markdown = md;
                    //element.markdown();
                       //config info: http://www.codingdrama.com/bootstrap-markdown/
                    $(element).markdown({autofocus:false,savable:false});
               }
           };
       }); 
})();

