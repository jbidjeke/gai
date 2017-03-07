myAppServices.service('rest', ['$http', '$localStorage', '$window', '$state', 'defaultLocalisation', function ($http, $localStorage, $window, $state, defaultLocalisation) { // Service rest api
    this.login = function(data){
        var fd = new FormData();
        fd.append('email', data.email );
        fd.append('password', data.password );
        $http.post(defaultLocalisation.login, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data){
		   // console.log(data);
        	if (data === Object(data)){
				//$localStorage.setObject('loginData', data);
				$window.sessionStorage.setItem('loginData', JSON.stringify(data));
        	}else{
                alert(data);				
            	//$localStorage.setObject('loginData', "");	
        	}
			$window.location.reload();
			//$state.go('app.dashboard', {"category": "annonces"});
        })
        .error(function(){
        	alert("echec de connexion");
        	console.log("testko");
        	//$localStorage.setObject('loginData', "");
        	//alert("testko");
        });
    }

    this.password = function(data){
        var fd = new FormData();
        fd.append('email', data.email );
        console.log(defaultLocalisation.password);
        $http.post(defaultLocalisation.password, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data){
        	alert("Veuillez consulter votre messagerie!");
        })
        .error(function(){
        	alert("Envoi de nouveau mot de passe impossible");
        	console.log("testko");
        });
    }
}]);
