Template.eventSubmit.events({
	'submit form': function(e) {
	e.preventDefault();

	var event = {
	  url: $(e.target).find('[name=url]').val(),
	  title: $(e.target).find('[name=title]').val()
	};

	event._id = Events.insert(event);
	Router.go('eventPage', event);
	}
});
