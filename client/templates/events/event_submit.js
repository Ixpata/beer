Template.eventSubmit.events({
	'submit form': function(e) {
	e.preventDefault();

	var event = {
	  url: $(e.target).find('[name=url]').val(),
	  title: $(e.target).find('[name=title]').val()
	};

	Meteor.call('eventInsert', event, function(error, result) {
		if (error)
			return alert(error.reason);

	Router.go('eventPage', {_id: result._id});
	});
   }
});
