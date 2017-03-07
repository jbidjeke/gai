myAppFactories.factory('IssueResource', function ($http) {

    return {
      getList: function(domain, category, lat, lng) {
    	var issuePath = domain+'?mod=json&a=refresh&url=http%3A%2F%2Fwww.leboncoin.fr%2Fannonces%2Foffres%2Florraine%2F%3Fq%3D%26lat%3D'+lat+'%26lng%3D'+lng+'%26category%3D'+category+'%26distance%3D1000&price_strict=1';
    	console.log(issuePath);
    	var issues;
        var config = {
          method: 'GET',
          url: issuePath
        };
        return $http(config).then(
          function(response) {
        	  return response.data;
          }
        );
      },
      get: function(issueId) {
    	var issues = window.localStorage.getItem('issues');
    	var issue = null;
    	var log = [];

    	angular.forEach(issues, function(value, key) {
    		 if (value.id == issueId)
    			 issue = value;
    		}, log);


    	return issue;
      },
      getByUser: function(email, domain, category, lat, lng) {
		var issuePath = domain+'?mod=json&a=refresh&url=http%3A%2F%2Fwww.leboncoin.fr%2Fannonces%2Foffres%2Florraine%2F%3Fq%3D%26lat%3D'+lat+'%26lng%3D'+lng+'%26category%3D'+category+'%26distance%3D1000&price_strict=1';
    	console.log(issuePath);
    	var issues;
        var config = {
          method: 'GET',
          url: issuePath
        };
        return $http(config).then(
          function(response) {
			var issues = [];
			var log = [];
			angular.forEach(response.data, function(value, key) {
				 if (value.link == email)
				    issues.push(value);
				}, log);
			return issues;
			  
          }
        ); 
		  
		  
		  
		/*  
    	var issues = this.getList(domain, category, lat, lng);
    	var issue = null;
    	var log = [];

    	angular.forEach(issues, function(value, key) {
    		 if (value.link == email)
    			 issue = value;
    		}, log);


    	return issue;
		*/
      },
      setPersist: function(result){
    	  window.localStorage.setItem('issues', JSON.stringify(result));
      },
      getPersist: function(result){
    	  return JSON.parse(window.localStorage.getItem('issues'));
      }
    };

 });
