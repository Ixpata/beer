Router.configure({
	layoutTemplate: 'layout',
	layoutTemplate: 'loading',
	waitOn: function() {return Meteor.subscribe('events');}
});

Router.route('/', {name: 'eventsList'});
