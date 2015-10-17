Router.route('/', {
    template: 'home'
});
Router.route('/home');
Router.route('/employeeInfo/:_objectId/:_repID', function(){
  var params = this.params;
  var objectId = params.objectId;
  this.render("employeeInfo",{
    data: function(){
      return this.params;
    }
  });
});
