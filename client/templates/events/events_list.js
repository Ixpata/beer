Template.eventsList.helpers({
  events: function() {
    return Events.find({}, {sort: {submitted: -1}});
  }
});
