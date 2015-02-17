Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('events'), Meteor.subscribe('promoters')];
  }
});

Router.route('/', {name: 'splashPage'});

Router.route('/events', {name: 'eventsList'});

Router.route('/events/:_id', {
  name: 'eventPage',
  data: function() { return Events.findOne(this.params._id); }
});

Router.route('/events/:_id/edit', {
  name: 'eventEdit',
  data: function() { return Events.findOne(this.params._id); }
});

Router.route('/submit', {name: 'eventSubmit'});

Router.route('/promoters', {name: 'promotersList'});

Router.route('/promoters/:_id', {
  name: 'promoterPage',
  data: function() { return Promoters.findOne(this.params._id); }
});

Router.route('/promoters/:_id/edit', {
  name: 'promoterEdit',
  data: function() { return Promoters.findOne(this.params._id); }
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'eventPage'});
Router.onBeforeAction(requireLogin, {only: 'eventSubmit'});
