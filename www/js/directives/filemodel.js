/**
 * 
 */
var myAppDirectives = angular.module('starter.directives', ['ui.bootstrap', 'ui.bootstrap.transition'])
myAppDirectives.directive('fileModel', ['$parse', function ($parse) { // Attribue du champ file "file-model"
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                
                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);