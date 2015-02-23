Template.promoterSubmit.promoters({
  'submit form': function(e) {
  e.prpromoterDefault();

  var promoter = {
    url: $(e.target).find('[name=url]').val(),
    title: $(e.target).find('[name=title]').val()
  };

  Meteor.call('promoterInsert', promoter, function(error, result) {
    if (error)
      return alert(error.reason);

    if (result.promoterExists)
      alert('This link has already been posted');

    Router.go('promoterPage', {_id: result._id});

   });
  }
});
