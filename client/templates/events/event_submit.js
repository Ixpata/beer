Template.eventSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var event = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    Meteor.call('eventInsert', event, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);

      // show this result but route anyway
      alert('This link has already been posted');

      Router.go('eventPage', {_id: result._id});
    });
  }
});
