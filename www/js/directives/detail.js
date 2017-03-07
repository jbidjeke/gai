/**
 * 
 */
//var myAppDirectives = angular.module('starter.directives', ['ui.bootstrap', 'ui.bootstrap.transition'])
myAppDirectives.directive('detail', function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            //data: '=data',
            key:  '=key',
        },
        link: function (scope, element, attrs) {       	
            var isInitialized = false;
            scope.$watch('key', function(newVal, oldVal) { 
                if (newVal != null && !isInitialized) {
                	isInitialized = true;
                	var value = scope.$eval(attrs.detail), key = attrs.key;
                	var content = '<img  ng-src="'+value.thumbnail_link+'"  ng-click="showMarker('+key+')" />';
                	content += '<h2>'+value.title+'</h2>';
                	content += value.describe+'<br/>';
    		        content += '<span ng-if="'+value.price+'">'+value.price+' euro</span><br/>'+value.date+'<br/><a href="#" ng-click="showMarker('+key+')" class="button button-light icon ion-earth"></a>';
    		        content += '<a href="#/app/playlists/'+key+'" class="button button-light icon ion-image"></a>';
    		        content += '<a href="#/app/playlists/'+key+'" class="button button-light icon ion-information"></a>';
    		        content += '<a href="#/app/playlists/'+key+'" class="button button-light icon ion-ios-email"></a>';
    		        content += '<a href="#/app/playlists/'+key+'" class="button button-light icon ion-edit"></a>';
    		        content += '<a href="#/app/playlists/'+key+'" class="button button-light icon ion-close"></a>';   
                	$(element).html(content);
                }
            });        	
        }
    }
});