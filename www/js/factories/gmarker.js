/**
 * 
 */
myAppFactories.factory('gmarker', function (defaultLocalisation/*, $compile*/) {
    return {
    	create : function(map, infowindow, info, key){
           //Boucle 
           //Marker + infowindow + angularjs compiled ng-click
    	   //var contentString = "<div><a ng-click='clickTest()'>"+info.describe+"</a></div>";
    	   var price = info.price != null ? info.price : "";
    	   var date = info.date != null ? info.date : "";
    	   var contentString ="<div><img id='stream-img' height='144px' src='"+info.thumbnail_link+"'/><p>"+price+"<br/>"+date+"<br/><a href='#/app/itineraire/"+key+"'>Voir l\'itineraire</a></p>";
    	   if (info.departure == null)
    	      contentString ="<div><img id='stream-img' height='144px' src='"+info.thumbnail_link+"'/><p>"+price+"<br/>"+date+"</p></div>";
    	   
    	   /*contentString += '<br/><span >'  
               +'<button id="previous" ng-click="previous()"  class="glyphicon glyphicon-chevron-left">previous</button> |'                   
               +' <button id="next" ng-click="next()" class="glyphicon glyphicon-chevron-right">next</button>' 
               +'</span></div>';*/
    	      	        
    	   var marker = new google.maps.Marker({
    	       position: new google.maps.LatLng(info.lat, info.lng),
    	       map: map,
    	       title: info.title,
    	       icon: info.icon
    	   });
           marker.content = contentString;
    	   google.maps.event.addListener(marker, 'click', function() {
    		   infowindow.close();
    	       infowindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
    	       infowindow.open(map,marker);
    	   }); 
    	   
    	   return marker;
    		
    	},
      createOne : function (map, position){
    	  var marker = new google.maps.Marker({
   	       position: new google.maps.LatLng(position.lat, position.lng),
   	       map: map,
   	       title: "Ma position",
   	       icon: "images/pin.png"
   	      });   
      }/*,
      next : function (){
      	if (step < markers.length - 1)
      		step++;
      	else
      		step = 0;
      	google.maps.event.trigger(markers[step], 'click');
      	
      },
  	  previous : function (){
  		if (step > 0 )
      	    step--;
      	else
      		step = markers.length - 1;
  		google.maps.event.trigger(markers[step], 'click');	
      }*/
    	
    }
})