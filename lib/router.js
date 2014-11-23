Router.configure({
	layoutTemplate: 'layout',
	// layoutTemplate: 'loading',
	waitOn: function() {return Meteor.subscribe('events');}
});

Router.route('/', {name: 'eventsList'});
Router.route('/events/:_id', {
	name: 'eventPage',
    data: function() {return Events.findOne(this.params._id); }
});

