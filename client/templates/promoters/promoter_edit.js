Template.promoterEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var currentpromoterId = this._id;
    
    var promoterProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    }
    
    promoters.update(currentpromoterId, {$set: promoterProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('promoterPage', {_id: currentpromoterId});
      }
    });
  },
  
  'click .delete': function(e) {
     e.preventDefault();
    
    if (confirm("Delete this promoter?")) {
      var currentpromoterId = this._id;
      promoters.remove(currentpromoterId);
      Router.go('promotersList');
    }
  }
});
