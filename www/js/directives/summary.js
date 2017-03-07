/**
 *
 */
//var myAppDirectives = angular.module('starter.directives', ['ui.bootstrap', 'ui.bootstrap.transition'])
myAppDirectives.directive('sum', function ($timeout) {
    return {
        templateUrl: 'templates/summary.html'
    }
});