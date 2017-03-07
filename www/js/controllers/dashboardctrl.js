//angular.module('starter.controllers', [])

myAppControllers.controller('DashboardCtrl', function($scope,  $stateParams, $state, $ionicLoading, $cordovaGeolocation, $localStorage, $window, IssueResource, defaultLocalisation, geoLocation, $rootScope, $ionicPopup) {
    var request = {
			position : geoLocation.getGeolocation(), 
			category : $stateParams.category
			};  
	window.localStorage.setItem('request', request);
    $scope.category = $stateParams.category;
	$scope.session = $window.sessionStorage.getItem('loginData');
	
	
	if ($scope.session == null)
	   $state.go('app.playlists', {"category": "annonces"});
	
	$scope.session = JSON.parse($scope.session);
	
	$ionicLoading.show({
	      template: 'Chargement...'
	    }).then(function(){
	       console.log("The loading indicator is now displayed");
	});
    
	// listen initialize on loading
    //$rootScope.$on('initialize', function (request) {
    	IssueResource.getByUser($scope.session.email, defaultLocalisation.domain, request.category, request.position.lat, request.position.lng).then(function(result) {
	   	     $ionicLoading.hide().then(function(){
	   		    console.log("The loading indicator is now hidden");
	   	     });
	   	     $scope.issues = result;   
	   	     //IssueResource.setPersist(result);
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