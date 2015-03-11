Template.promoterSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var promoter = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val(),
      address: $(e.target).find('[name=address]').val()
    };

    Meteor.call('promoterInsert', promoter, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);

      // show this result but route anyway
      if (result.promoterExists)
        alert('This link has already been posted');

      Router.go('promoterPage', {_id: result._id});
    });
  }
});
