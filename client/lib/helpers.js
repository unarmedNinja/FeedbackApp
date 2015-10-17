Template.home.helpers({
  employees: function () {
	   return Session.get('employeelist');
		 //return [{name: "user1"},{name: "user2"}];
	},

	ipinfo: function(){
		var ip = "24.212.201.68";
		 Meteor.call('geoJsonForIp', ip, function (err, res) {
		      // The method call sets the Session variable to the callback value
		      if (err) {
		        Session.set('location', {error: err});
		      } else {
		        Session.set('location', res);
		        return res;
		      }
		});
	}
 });

Template.home.onRendered(function(){
	   Meteor.call('getEmployeeList', function(err,res){
		     if(err){
		         console.log(err);
		     }
         else{
			        console.log(res);
			        //why does the web service return a string?
			        var obj = JSON.parse(res);
              console.log(obj.results.length);
              Session.set('employeelist', obj.results);
		     }
      });
});

Template.employeeInfo.helpers({
  employee : function(){
    return Session.get("employeeData");
  },
  ratings : function(){
    return Session.get("employeeRatings");
  }
});


Template.employeeInfo.onRendered(function(){
  var objectId = $('#empObjId').html();
  var empID = $('#empId').html();
  console.log("using id: ", objectId);
  Meteor.call('getEmployeeInfo', objectId, function(err,res){
      if(err){
          console.log(err);
      }
      else{
        console.log(res);
        //why does the web service return a string?
        var obj = JSON.parse(res);
        Session.set('employeeData', obj);
        Session.set('employeeRatings', [{"name":"one"}]);
      }
    });

  Meteor.call('getEmployeeRatings', empID, function(err,res){
    if(err){
        console.log(err);
    }
    else{
      console.log(res);
      //why does the web service return a string?
      var obj = JSON.parse(res);
      Session.set('employeeRatings', obj.results);
    }
  });

});
