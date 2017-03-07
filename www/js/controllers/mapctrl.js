//angular.module('starter.controllers', [])

myAppControllers.controller('MapCtrl', function($scope, $stateParams, $ionicLoading, $ionicPopup, $compile, $localStorage, defaultLocalisation, geoLocation, gmarker, IssueResource) {
	var step = 0, markers = [];
	var request = {
			position : geoLocation.getGeolocation(),
			category : $stateParams.category
    };
	window.localStorage.setItem('request', request);
    //$scope.loginData = $localStorage.getObject('loginData');
 	$scope.image_host = defaultLocalisation.image_host;
	$scope.initialize = function (issues) {
		//var issues = IssueResource.getPersist();
		var position = request.position;

		//Get map position
        var myLatlng = new google.maps.LatLng(position.lat,position.lng);
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);

        var infowindow = new google.maps.InfoWindow();

        var marker = gmarker.createOne(map, position);
    	markers[-1] = marker;

        //Boucle
        //Marker + infowindow + angularjs compiled ng-click
        for (var index = 0; index < issues.length; index++){
        	marker = gmarker.create(map, infowindow, issues[index], index);
        	markers[index] = marker;
        }
        var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'images/m'});
        $scope.map = map;
        $scope.markers = markers;

    }


    //$scope.issues = IssueResource.getList(defaultLocalisation.domain, request.category, request.position.lat, request.position.lng);
    //IssueResource.setPersist($scope.issues);

	$ionicLoading.show({
	      template: 'Chargement...'
	    }).then(function(){
	       console.log("The loading indicator is now displayed");
	});



	// listen initialize on loading
    //$rootScope.$on('initialize', function (request) {
    	IssueResource.getList(defaultLocalisation.domain, request.category, request.position.lat, request.position.lng).then(function(result) {
	   	     $ionicLoading.hide().then(function(){
	   		    console.log("The loading indicator is now hidden");
	   	     });
	   	     //window.localStorage.setItem('request', request);
	   	     $scope.issues = result;
	   	     IssueResource.setPersist(result);
	   	     $scope.initialize($scope.issues);
         });
    //});



      //google.maps.event.addDomListener(window, 'load', initialize);


      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };

      $scope.showMarker = function(step) {
    	  google.maps.event.trigger($scope.markers[step], 'click');
      };

      $scope.next = function() {
    	  //gmarker.next();
    	  if (step < $scope.markers.length - 1)
        		step++;
          else
        		step = 0;
          google.maps.event.trigger($scope.markers[step], 'click');
      };

      $scope.previous = function() {
          //gmarker.previous();
    	  if (step > 0 )
        	    step--;
          else
        		step = $scope.markers.length - 1;
    	  google.maps.event.trigger($scope.markers[step], 'click');
      };


  });