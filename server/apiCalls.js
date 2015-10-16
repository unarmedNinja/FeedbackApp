var apiCall = function (apiUrl, callback) {
  // try…catch allows you to handle errors 
  try {
    var headers 
    var response = HTTP.call("get",apiUrl, { headers: {
		"X-Parse-Application-Id" : "OfcmdQb86wghANsqh4T2FZ7yftzfjGhNnij8cjPO",
		"X-Parse-REST-API-Key": "CB2KhjZJKCTi5WNW2ZfT7qC5mys48Xfnn2vriBGj",
		"Content-Type": "application/json"
	}
    });
    // A successful API call returns no error 
    // but the contents from the JSON response
    callback(null, response);
  } catch (error) {
    // If the API responded with an error message and a payload 
    if (error.response) {
      var errorCode = error;
      var errorMessage = JSON.stringify(error);
    // Otherwise use a generic error message
    } else {
      var errorCode = 500;
      var errorMessage = 'Cannot access the API';
    }
    // Create an Error object and return it via callback
    var myError = new Meteor.Error(errorCode, errorMessage);
    callback(myError, null);
  }
}

Meteor.methods({
  'geoJsonForIp': function (ip) {
    // avoid blocking other method calls from the same client
    this.unblock();
    var apiUrl = 'http://www.telize.com/geoip/' + ip;
    // asynchronous call to the dedicated API calling function
    var response = Meteor.wrapAsync(apiCall)(apiUrl);
    return response;
  },
 	'getEmployeeList': function(){
		this.unblock();
		var apiUrl = 'https://api.parse.com/1/classes/CustomerReps';
	    var response = Meteor.wrapAsync(apiCall)(apiUrl);
	    return response.content;
	}
});
