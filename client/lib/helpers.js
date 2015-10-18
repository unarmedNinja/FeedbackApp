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
drawChart();
      // Load the Visualization API and the piechart package.
  //    google.load('visualization', '1', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
  //    google.setOnLoadCallback(drawChart);
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
  //    $("#ratingTable").dataTable();
    }
  });

});

Template.landing.onRendered(function(){
  Meteor.call('getAllRatings', function(err,res){
    if(err){
        console.log(err);
    }
    else{
      console.log(res);
      //why does the web service return a string?
      var obj = JSON.parse(res);
      var dates = [];
      var sets = [];
      var dset = {
    /*    label: "feedback dataset",
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)"*/
      };
      var rates = [];
      /*
      var ratings = _.groupBy(obj.results,function(result){
        var datetime = moment(result.createdAt).format("MM-DD-YYYY");
        console.log("formated date: ", datetime);
        dates.push[datetime];
        return datetime;
      });
*/
var names = [];
names[2000] = "Hassan Latif";
names[2001] = "John Simone";
names[2002] = "Casey Johnson";
names[2003] = "Eric Kazanecki";
names[2004] = "Jason Dong";
names[2005] = "Leonard Lechance";
names[2006] = "Sarah Barel";
names[2007] = "Mary Joseph";
names[2008] = "Anna Ebrahim";
names[2009] = "Anil Bala";

//group data by employee
var ratings = _.groupBy(obj.results,function(result){

  return result.repID;
});

      _.each(ratings,function(val, key){
        console.log(JSON.stringify(val))
        var temp=arrayAverage(_.pluck(val,"answer2"));
        var avg = Math.round(temp);
        rates.push(avg);
        dates.push(names[key]);
      });
      var rateset = [];

      dset.data = rates;
      rateset.push(dset);
      drawLandingChart(dates,rateset);
      Session.set('allRatings', [{"answer1":5,"answer2":7,"createdAt":"2015-10-16T14:52:26.532Z","customerID":"1002","feedback":"Blah blah","objectId":"nv1rCds9Hj","repID":"2002","updatedAt":"2015-10-16T16:53:18.961Z"},{"answer1":7,"answer2":7,"createdAt":"2015-10-17T14:55:23.355Z","customerID":"1003","feedback":"Tell us how we can improve our services..","objectId":"vNYRyGppgV","repID":"2002","updatedAt":"2015-10-17T14:58:00.656Z"}]);
  //    $("#ratingTable").dataTable();

    }
  });
});
