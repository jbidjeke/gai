//angular.module('starter.controllers', [])

myAppControllers.controller('PlaylistsCtrl', function($scope, $stateParams, $ionicLoading, $cordovaGeolocation, $localStorage, IssueResource, defaultLocalisation, geoLocation, $rootScope, $ionicPopup) {
	var request = {
			position : geoLocation.getGeolocation(),
			category : $stateParams.category
			};
	window.localStorage.setItem('request', request);
	$scope.category = $stateParams.category;
	$scope.averageSpeed = parseInt($localStorage.getObject('average'));
	//console.log($scope.averageSpeed);


	$ionicLoading.show({
	      template: 'Chargement...'
	    }).then(function(){
	       console.log("The loading indicator is now displayed" );
	});



	// listen initialize on loading
    //$rootScope.$on('initialize', function (request) {
    	IssueResource.getList(defaultLocalisation.domain, request.category, request.position.lat, request.position.lng).then(function(result) {
	   	     $ionicLoading.hide().then(function(){
	   		    console.log("The loading indicator is now hidden");
	   	     });
	   	     //window.localStorage.setItem('request', request);
	   	     $scope.issues = result.items;
	   	     IssueResource.setPersist(result.items);
         });
    //});



	// listen location changes
    /*$rootScope.$on('location:change', function () {
    	request = window.localStorage.getItem('request');
    	IssueResource.getList(defaultLocalisation.domain, request.category, request.position.lat, request.position.lng).then(function(result) {
	   	     $ionicLoading.hide().then(function(){
	   		    console.log("The loading indicator is now hidden");
	   	     });
	   	     $scope.issues = result;
         });
    });*/


});
