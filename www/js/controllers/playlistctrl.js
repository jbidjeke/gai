//angular.module('starter.controllers', [])

myAppControllers.controller('PlaylistCtrl', function($scope, $stateParams, $ionicLoading, $compile, $localStorage, $window, geoLocation, gmarker, IssueResource) {
	$ionicLoading.show({
	      template: 'Loading...'
	    }).then(function(){
	       console.log("The loading indicator is now displayed");
	});

	$scope.id = $stateParams.playlistId
	$scope.issues = IssueResource.getPersist();
	$scope.issue = $scope.issues[$scope.id];
	$scope.averageSpeed = parseInt($localStorage.getObject('average'));
	//$scope.session = $window.sessionStorage.getItem('loginData');

	$ionicLoading.hide().then(function(){
	    console.log("The loading indicator is now hidden");
    });

	$scope.initialize = function (issue, id) {
		var position = geoLocation.getGeolocation();
		//Get map position
        var myLatlng = new google.maps.LatLng(position.lat,position.lng);
        var infowindow = new google.maps.InfoWindow();
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        //------------
        //Boucle
        //Marker + infowindow + angularjs compiled ng-click
        //----------
        var marker = gmarker.create(map, infowindow, issue, id);

        $scope.map = map;
    }

	$scope.initialize($scope.issue, $scope.id);



});
