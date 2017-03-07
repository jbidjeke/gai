/**
 * 
 */
var myAppFactories = angular.module('starter.factories', [])
myAppFactories.factory('geoLocation', function ($localStorage) {
    return {
        setGeolocation: function (latitude, longitude) {
            var position = {
                latitude: latitude,
                longitude: longitude
            }
            $localStorage.setObject('geoLocation', position)
            
        },
        getGeolocation: function () { 
            return {
                lat: $localStorage.getObject('geoLocation').latitude,
                lng: $localStorage.getObject('geoLocation').longitude
            }
        }
    }
})