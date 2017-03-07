// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js. That's the same logic with the others parameters.
var myAppModule = angular.module('starter', ['ionic', 'starter.services', 'starter.controllers', 'starter.directives', 'starter.factories', 'ngCordova'])

.run(function($ionicPlatform, $cordovaGeolocation, geoLocation, $rootScope, $window, defaultLocalisation, $ionicPopup, network) {
  // waiting the platform ready event
  $ionicPlatform.ready(function() {

	        $cordovaGeolocation
	            .getCurrentPosition()
	            .then(function (position) {
	                geoLocation.setGeolocation(position.coords.latitude, position.coords.longitude);
                    // broadcast this event on the rootScope
	                $rootScope.$broadcast('initialize', geoLocation.getGeolocation());
	            }, function (err) {
	                 // you need to enhance that point
	                $ionicPopup.alert({
	                    title: 'Ooops...',
	                    template: err.message
	                });

	                geoLocation.setGeolocation(defaultLocalisation.latitude, defaultLocalisation.longitude)
	            });

	        // begin a watch
	        var watch = $cordovaGeolocation.watchPosition({
	            frequency: 1000,
	            timeout: 3000,
	            enableHighAccuracy: false
	        }).then(function () {
	            }, function (err) {
	                // you need to enhance that point
	                geoLocation.setGeolocation(defaultLocalisation.latitude, defaultLocalisation.longitude);
	            }, function (position) {
	                geoLocation.setGeolocation(position.coords.latitude, position.coords.longitude);
	                // broadcast this event on the rootScope
	                $rootScope.$broadcast('location:change', geoLocation.getGeolocation());
	            }
	        );
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
  network.download();
 })

 .filter('trustUrl', function ($sce) {
	    return function(url) {
	      return $sce.trustAsResourceUrl(url);
	    };
 })

.config(function($stateProvider, $urlRouterProvider) {
 
  $stateProvider
  .state('app.subcribe', {
    url: '/subcribe',
    views: {
      'menuContent': {
        templateUrl: 'templates/subcribe.html'
      }
    }
  })
  .state('app.single', {
    url: '/playlist/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
     }
   })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.dashboard', {
      url: '/dashboard/:category',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashboardCtrl'
        }
      }
    })

  .state('app.itineraire', {
      url: '/itineraire/:playlistId',
      views: {
        'menuContent': {
          templateUrl: 'templates/itineraire.html',
          controller: 'ItineraireCtrl'
        }
      }
    })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
	.state('app.map', {
		    url: '/map/:category',
		    views: {
		      'menuContent': {
		        templateUrl: 'templates/map.html',
		        controller: 'MapCtrl'
		      }
		    }
	})
	
	.state('app', {
			url: '/app',
			abstract: true,
			templateUrl: 'templates/menu.html',
			controller: 'AppCtrl'
			});
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
		 $stateProvider
		  .state('app.playlists', {
			  url: '/playlists/:category',
			  views: {
				'menuContent': {
				  templateUrl: 'templates/playlists.html',
				  controller: 'PlaylistsCtrl'
				}
			  }
			});
    }else{ // Web content
		 $stateProvider
		  .state('app.playlists', {
			  url: '/playlists/:category',
			  views: {
				'menuContent': {
				  templateUrl: 'templates/splaylists.html',
				  controller: 'PlaylistsCtrl'
				}
			  }
			});
		 
    };
	$urlRouterProvider.otherwise('/app/playlists/annonces');
  /*}else{ // Content web
	  $stateProvider
	  .state('app.map', {
		    url: '/map/:category',
		    views: {
		      'menuContent': {
		        templateUrl: 'templates/wmap.html',
		        controller: 'MapCtrl'
		      }
		    }
		  })
	  .state('app', {
	    url: '/app',
	    abstract: true,
	    templateUrl: 'templates/wmenu.html',
	    controller: 'AppCtrl'
	  });
	  $urlRouterProvider.otherwise('/app/map/annonces');
  }*/
});

if (window.location.host != "localhost"){
	// fall back and local setting
	myAppModule.constant('defaultLocalisation', {
	    'longitude': 6.744914999999992,
	    'latitude': 48.451580799999995,
	    'url_add_advert': "http://admin.geoalertinfo.com/platform/add",
	    'domain': "http://api.geoalertinfo.com/",
	    'image_host': "http://admin.geoalertinfo.com/",
	    'url_edit':"http://admin.geoalertinfo.com/platform/edit",
	    'url_delete':"http://admin.geoalertinfo.com/platform/delete",
	    'login':"http://admin.geoalertinfo.com/user/login",
	    'password':"http://admin.geoalertinfo.com/user/password",
	});

}else{
	// fall back and local setting
	myAppModule.constant('defaultLocalisation', {
	    'longitude': 6.744914999999992,
	    'latitude': 48.451580799999995,
	    'url_add_advert': "http://localhost/symfony/platform/add",
	    'domain': "http://localhost:8181/adverts",
	    'image_host': "http://localhost/symfony/",
	    'url_edit':"http://localhost/symfony/platform/edit",
	    'url_delete':"http://localhost/symfony/platform/delete",
	    'login':"http://localhost/symfony/user/login",
	    'password':"http://localhost/symfony/user/password",
	});


}
