Template.lessonSubmit.events({
	'submit form': function(e) {
	e.preventDefault();

	var lesson = {
	  url: $(e.target).find('[name=url]').val(),
	  title: $(e.target).find('[name=title]').val()
	};

	Meteor.call('lessonInsert', lesson, function(error, result) {
		if (error)
			return alert(error.reason);

		if (result.lessonExists)
			alert('This link has already been posted');

		Router.go('lessonPage', {_id: result._id});

	});
   }
});
