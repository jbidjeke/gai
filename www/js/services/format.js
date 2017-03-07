myAppServices.service('Format', function () {
    return {
      date : function(myDate){
    	  var d = new Date(myDate);
    	  return [d.getDate().padLeft(), (d.getMonth()+1).padLeft(),d.getFullYear()].join('/');
      },
      time : function(myTime){
    	  var t = new Date(myTime); 
    	  return [t.getHours().padLeft(),t.getMinutes().padLeft(),t.getSeconds().padLeft()].join(':');
      }
    };

 });
