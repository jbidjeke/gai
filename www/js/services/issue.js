myAppServices.service('IssueResource', function ($http, $localStorage) {
    return {
      getList: function(domain, category, lat, lng) {
      	//var issuePath = domain+'?mod=json&a=refresh&url=http%3A%2F%2Fwww.leboncoin.fr%2Fannonces%2Foffres%2Florraine%2F%3Fq%3D%26lat%3D'+lat+'%26lng%3D'+lng+'%26category%3D'+category+'%26distance%3D1000&price_strict=1';
      	var issuePath = domain+'?lat%3D'+lat+'%26lng%3D'+lng+'%26category%3D'+category+'%26distance%3D5000&price_strict=1';
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
      	var issues = $localStorage.getObject('issues');
      	var issue = null;
      	var log = [];

      	angular.forEach(issues, function(value, key) {
      		 if (value.id == issueId)
      			 issue = value;
      		}, log);


      	return issue;
      },
      setPersist: function(result){
    	  $localStorage.setObject('issues', result);
      },
      getPersist: function(){
    	  return $localStorage.getObject('issues');
      }
    };

 });
