//angular.module('starter.controllers', [])

myAppControllers.controller('EditCtrl', function($scope, $stateParams, $ionicLoading, $compile, $localStorage, geoLocation, gmap, IssueResource) {
	$ionicLoading.show({
	      template: 'Loading...'
	    }).then(function(){
	       console.log("The loading indicator is now displayed");
	});
	//$scope.issue = IssueResource.get($stateParams.playlistId);
	$scope.id = $stateParams.playlistId
	$scope.issues = IssueResource.getPersist();
	$scope.issue = $scope.issues[$scope.id];
    
	
	
	$ionicLoading.hide().then(function(){
	    console.log("The loading indicator is now hidden");
    });
	
	//Initialiser les donnees utilisateur
	$scope.user = {
			   
			   alert        : { 
			                    email         : null,
			                    range         : null,
			                    group_ads     : null,
			                    url           : null
			                   },
			   domain        : null,
			   region        : null,
			   pays          : null,
			   myCategory_url: null,
			   search        : null,
			   domain_search : null,
			   advert        : {
			                    price      : null,
			                    title      : null,
			                    author     : null,
			                    user       : {
			                       email     : null,
			                    },
			                    content    : null,
			                    itineraire : {
			                   	   departure  : null,
			                       arrival    : null,
			                       time       : null,
			                       date       : null
			                    },
			                    image      : null,
			                    categories : null,
			                    published  : 0,
			                    save       : null,
			                   }
			  };
	  }
	  
	
	

});
