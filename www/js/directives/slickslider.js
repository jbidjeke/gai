/**
 * 
 */
//var myAppDirectives = angular.module('starter.directives', ['ui.bootstrap', 'ui.bootstrap.transition'])
myAppDirectives.directive('slickSlider', function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            data: '=data'
        },
        link: function (scope, element, attrs) {       	
            var isInitialized = false;
            scope.$watch('data', function(newVal, oldVal) { 
                if (newVal != null && !isInitialized) {
                    $(element).slick(scope.$eval(attrs.slickSlider));
                    isInitialized = true;
                }
            });        	
        }
    }
});