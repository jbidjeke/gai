var myAppServices = angular.module('starter.services', [])

.service('fileUpload', ['$http', 'geoLocation', function ($http, geoLocation) { // Service d'upload d'image
    this.uploadFileToUrl = function(file, uploadUrl, otherData, action){
    	var position = geoLocation.getGeolocation();
        var fd = new FormData();
        if (action == "edit"){
           fd.append('oc_platformbundle_advert_edit', file);
           fd.append('oc_platformbundle_advert_edit', angular.toJson(otherData) );
        }else{
        	fd.append('oc_platformbundle_advert', file);
            fd.append('oc_platformbundle_advert', angular.toJson(otherData) );
        }
        fd.append('lat', position.lat );
        fd.append('lng', position.lng );
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data){
        	console.log("testok");
			alert(data);
        })
        .error(function(){
        	console.log("error");
        	alert("error");
        });



    }
}]);
