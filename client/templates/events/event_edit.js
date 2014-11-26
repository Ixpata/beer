Template.eventEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var currentEventId = this._id;
    
    var eventProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    }
    
    Events.update(currentEventId, {$set: eventProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('eventPage', {_id: currentEventId});
      }
    });
  },
  
  'click .delete': function(e) {
    e.preventDefault();
    
    if (confirm("Delete this event?")) {
      var currentEventId = this._id;
      Events.remove(currentEventId);
      Router.go('eventsList');
    }
  }
});
