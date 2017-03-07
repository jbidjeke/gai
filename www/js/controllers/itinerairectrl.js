//angular.module('starter.controllers', [])

myAppControllers.controller('ItineraireCtrl', function($scope, $stateParams, IssueResource) {
   $scope.issues = IssueResource.getPersist();
   $scope.issue = $scope.issues[$stateParams.playlistId];
   $scope.url = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyCs_vwGLGiPNzpSnesYiQzESlNb04ZwUN0&origin="+$scope.issue.departure+"&destination="+$scope.issue.arrival;
});