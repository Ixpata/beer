Template.lessonItem.helpers({
  ownLesson: function() {
	return this.userId === Meteor.userId();
  }
});

Template.registerHelper('formatDate', function(date) {
  return new Date(date).toDateString();
});
