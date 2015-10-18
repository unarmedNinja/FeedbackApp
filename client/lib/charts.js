drawChart = function(){
  console.log("calling drawChart");
  var data = {
  labels : ["January","February","March","April","May","June","July"],
  datasets : [
    {
        fillColor : "rgba(220,220,220,0.5)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        data : [65,59,90,81,56,55,40]
    },
    {
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor : "#fff",
        data : [28,48,40,19,96,27,100]
    }
    ]
  }


  //Get context with jQuery - using jQuery's .get() method.
  var ctx = $("#myChart").get(0).getContext("2d");
  //This will get the first returned node in the jQuery collection.
  var myNewChart = new Chart(ctx);

  new Chart(ctx).Line(data);
}


  drawLandingChart = function(labels,dataset){
console.log("starting drawLandingChart");
console.log(JSON.stringify(dataset));
console.log(JSON.stringify(labels));

var data = {

  labels : labels,
  datasets :dataset
};
console.log("chart data=> ",JSON.stringify(data));
labels = ["one","two","three"];
dataset = [
  {data:[1,23]},
  {data: [2,45]}
];

  var  data2 = {

      labels : labels,
      datasets :dataset
    };
console.log(data)
    console.log("chart data=> ",JSON.stringify(data));
    //Get context with jQuery - using jQuery's .get() method.
    var ctx = $("#myBarChart").get(0).getContext("2d");
    //This will get the first returned node in the jQuery collection.
    var myNewChart = new Chart(ctx);

    new Chart(ctx).Bar(data,{responsive:true});
  }

arrayAverage = function(arr) {
  return _.reduce(arr, function(memo, num) {
    return memo + num;
  }, 0) / (arr.length === 0 ? 1 : arr.length);
}
