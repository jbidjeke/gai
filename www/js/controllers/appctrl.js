var myAppControllers = angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $state, $timeout, $location, $localStorage, $window, rest, fileUpload, Format, defaultLocalisation, IssueResource) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  /*$scope.$on('$ionicView.enter', function(e) {
  });*/


  $scope.myFile = null;
  /*
   * Form data for the advert modal
   */
  $scope.categories = [
                   {url:'annonces', name:'Toutes les categories'},
                   /*{url:'_vehicules_', name:'Auto'},
                   {url:'bakery', name:'Boulangerie'},
                   {url:'bar', name:'Bar'},*/
                   {id: 9, url:'bureaux_commerces', name:'Bureaux et Commerces'},
                   //{url:'campground', name:'Camping'},
                   {id: 7, url:'colocations', name:'Colocations'},
                   {id: 15, url:'covoiturage', name:'Covoiturage'},
                   //{url:'electrician', name:'Electricien'},
                   {id: 13, url:'offres_d_emploi', name:'Emploi Services'},
                   //{url:'_immobilier_', name:'Immobilier'},
                   {id: 6, url:'locations', name:'Locations'},
                   /*{url:'locations_de_vacances', name:'Locations de vacances'},
                   {url:'lodging', name:'Hebergement'},*/
                   {id: 11, url:'_loisirs_', name:'Loisirs'},
                   {id: 10, url:'_maison_', name:'Maison'},
                   //{url:'store', name:'Magasin'},
                   {id: 3, url:'motos', name:'Motos'},
                   {id: 14, url:'_multimedia_', name:'Multimedia'},
                   {id: 12, url:'_materiel_professionnel_', name:'Materiel Professionnel'},
                   {id: 4, url:'nautisme', name:'Nautisme'},
                   /*{url:'point_of_interest', name:'Point touristique'},
                   {url:'restaurant', name:'Restaurant'},
                   {url:'park', name:'Stationnement'},*/
                   {id: 2, url:'voitures', name:'Voitures'},
                   {id: 5, url:'ventes_immobilieres', name:'Ventes immobilieres'},
                   //{url:'zoo', name:'Zoo'},
                 ];


  $scope.initialize = function (){
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

  $scope.initialize();



  //Go to Map
  $scope.dashboard = function() {
	  $state.go('app.dashboard', {"category": "annonces"});
  };

  //Go to Map
  $scope.map = function(category) {
	  $state.go('app.map', {"category": category});
  };

  //Go to Route on Itineraire
  $scope.itineraire = function(id) {
	  $state.go('app.itineraire', {"playlistId": id});
  };

  $scope.beforeUpload = function (action){
	  var d = new Date($scope.user.advert.itineraire.date);
		$scope.user.advert.itineraire.date = Format.date($scope.user.advert.itineraire.date);
		$scope.user.advert.itineraire.time = Format.time($scope.user.advert.itineraire.time);
		console.log('Doing before upload Advert', $scope.user.advert.categories);

	   //if ($scope.user.advert.categories != "Covoiturage" || $scope.user.advert.categories != "15")
		if (action == "edit"){
		   if ($scope.user.advert.categories != "Covoiturage")
	       delete $scope.user.advert.itineraire;
		   delete $scope.user.advert.categories;
		}else{
			if ($scope.user.advert.categories != "15")
			       delete $scope.user.advert.itineraire;
			$scope.user.advert.categories = [$scope.user.advert.categories];
		}

	    $scope.user.advert.save = "";
	    $scope.uploadFile($scope.user.advert, action);
	    console.log('Doing after upload Advert', $scope.user);
  }

  $scope.uploadFile = function(otherData, action){
	  url = defaultLocalisation.url_add_advert;
	  if (action == "edit")
		  url = defaultLocalisation.url_edit+"/"+$scope.issue.id;
	  else if (action == "del")
		  url = defaultLocalisation.url_delete+"/"+$scope.issue.id;

      fileUpload.uploadFileToUrl(otherData.image, url, otherData, action);
  };




  /**
   * Create the add advert modal that we will use later
   */
  $ionicModal.fromTemplateUrl('templates/add.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalAdd = modal;
  });
  //Triggered in the advert modal to close it
  $scope.closeAdd = function() {
    $scope.modalAdd.hide();
  };

 //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modalAdd.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
	$scope.initialize();
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
	//$scope.initialize();
  });
  //Open the add advert modal
  $scope.add = function() {
    $scope.modalAdd.show();
  };


  //Perform the login action when the user submits the login form
  $scope.doAdd = function() {
	$scope.beforeUpload("add");
    $scope.modalAdd.hide();
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeAdd();
    }, 1000);
  };


  /**
   * Form data for the login modal
   */
  $scope.loginData = {};
  $scope.session = $window.sessionStorage.getItem('loginData');

  //console.log($window.sessionStorage.getItem('loginData'));

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    animation: 'newspaper'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  
  
  $scope.logout = function() {
    $window.sessionStorage.removeItem('loginData');
	//location.href =  $location.absUrl();
	//$window.location.href = "/gai/";
	$window.location.reload();
  };
  


  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
	//$localStorage.setObject('loginData', "");
    $scope.modal.hide();
    rest.login($scope.loginData);
   
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 5000);
  };

  $scope.doPasword = function() {
	$scope.modal.hide();
	rest.password($scope.loginData);
  }


  /**
   * Form data for the edit modal
   */
//Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/edit.html', {
    scope: $scope,
    animation: 'newspaper'
  }).then(function(modal) {
    $scope.modalEdit = modal;
  });

  // Triggered in the edit modal to close it
  $scope.closeEdit = function() {
    $scope.modalEdit.hide();
  };

  // Open the edit modal
  $scope.edit = function(issue) {
	$scope.issue = issue;
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
			                    price      : issue.price,
			                    title      : issue.title,
			                    author     : issue.author,
			                    user       : {
			                       email     : issue.link,
			                    },
			                    content    : issue.describe,
			                    itineraire : {
			                   	   departure  : issue.departure,
			                       arrival    : issue.arrival,
			                       time       : issue.time_itineraire,
			                       date       : issue.date_itineraire
			                    },
			                    image      : null,
			                    categories : issue.category,
			                    save       : null,
			                   }
			  };
    $scope.modalEdit.show();
  };

  // Perform the edit action when the user submits the login form
  $scope.doEdit = function() {
	$scope.beforeUpload("edit");
    $scope.modalEdit.hide();
    console.log('Doing edit', $scope.issue);
	//$scope.map("annonces");
    // Simulate a edit delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeEdit();
    }, 1000);
  };



  /**
   * Form data for the delete modal
   */
//Create the delete modal that we will use later
  $ionicModal.fromTemplateUrl('templates/delete.html', {
    scope: $scope,
    animation: 'newspaper'
  }).then(function(modal) {
    $scope.modalDel = modal;
  });

  // Triggered in the del modal to close it
  $scope.closeDel = function() {
    $scope.modalDel.hide();
  };

  // Open the del modal
  $scope.del = function(issue) {
	$scope.issue = issue;
	$scope.doDel();
    //$scope.modalDelete.show();
  };

  // Perform the del action when the user submits the login form
  $scope.doDel = function(){
	$scope.beforeUpload("del");
    $scope.modalDel.hide();
    console.log('Doing ', $scope.issue);
	$state.go('app.dashboard');
	$scope.map("annonces");
    // Simulate a delete delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeDel();
    }, 1000);
  };





});
