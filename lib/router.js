Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {return Meteor.subscribe('events');}
});

Router.route('/', {name: 'splashPage'});

Router.route('/businesses', {name: 'businessesList'});

Router.route('/events', {name: 'eventsList'});

Router.route('/events/:_id', {
  name: 'eventPage',
  data: function() {return Events.findOne(this.params._id); }
});

Router.route('/events/:_id/edit', {
  name: 'eventEdit',
  data: function() { return Events.findOne(this.params._id); }
});

Router.route('/submit', {name: 'eventSubmit'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    }  else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'eventPage'});
Router.onBeforeAction(requireLogin, {only: 'eventSubmit'});
