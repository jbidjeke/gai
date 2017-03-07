myAppServices.service('network', ['$http', '$localStorage', '$window', '$state', 'defaultLocalisation', function ($http, $localStorage, $window, $state, defaultLocalisation) { // Service rest api
    
	this.net = function (){
	    var settings = {
		
			endpoint: 'js/network/server/server.php', // Where is located the PHP file.

			// The complete settings list is available below.

		};
		
		var average;

		// Create a new Network instance by providing an optional object.
		return new Network(settings);	
    }		
	
	
	this.latency = function(){
		var net = this.net();
    	// Listen for the "end" event which provides the calculated latencies.
		net.latency.on('end', function(averageLatency, allLatencies) {
			// "allLatencies" is an array containing the five calculated latencies in
			// milliseconds. They're used to determine an average latency.
			$localStorage.setObject('average', averageLatency);
			//console.log('end', averageLatency, allLatencies);
		});

		// Once all the configuration is done, start the requests for this module.
		net.latency.start();

    }
	  
    this.upload = function(){
		var net = this.net();
    	// It is possible to chain functions for all the modules, here's an example with the
		// upload module.
		net.upload
			 .on('start', function(dataSize) {
				 //console.log('start', dataSize);
			 })
			 .on('progress', function(averageSpeed, instantSpeed) {
				 // Every bandwidth measure are in Mega BYTES per second!
				 //console.log('progress', averageSpeed, instantSpeed);
			 })
			 .on('restart', function(dataSize) {
				 // The restart event is triggered when the module didn't have time
				 // (according to the `delay` option) to take all the measures. A new
				 // request will start with data size increased by the multiplier value.
				 //console.log('restart', dataSize);
			 })
			 .on('end', function(averageSpeed, allInstantSpeeds) {
				 $localStorage.setObject('average', averageSpeed);
				 //console.log('end', averageSpeed, allInstantSpeeds);
			 })
			 .start();

      }
	  
    this.download = function(){
		var net = this.net();
    	// It is possible to chain functions for all the modules, here's an example with the
		// download module.
		net.download
			 .on('start', function(dataSize) {
				 //console.log('start', dataSize);
			 })
			 .on('progress', function(averageSpeed, instantSpeed) {
				 // Every bandwidth measure are in Mega BYTES per second!
				 //console.log('progress', averageSpeed, instantSpeed);
			 })
			 .on('restart', function(dataSize) {
				 // The restart event is triggered when the module didn't have time
				 // (according to the `delay` option) to take all the measures. A new
				 // request will start with data size increased by the multiplier value.
				 //console.log('restart', dataSize);
			 })
			 .on('end', function(averageSpeed, allInstantSpeeds) {
				 $localStorage.setObject('average', averageSpeed);
				 //console.log('end', averageSpeed, allInstantSpeeds);
			 })
			 .start();
			
    }
	
}]);


