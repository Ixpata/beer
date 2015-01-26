Template.lessonsList.events({
  "change .hide-completed input": function (event) {
	Session.set("hideCompleted", event.target.checked);
  }
});

Template.lessonsList.helpers({
  lessons: function() {
	return Lessons.find({});
  },
  groupedDates: function() {
	var lessons;
	if (Session.get("hideCompleted")) {
      lessons = Lessons.find({danceAfter: {$ne: false}});
    } else {
      lessons = Lessons.find({danceAfter: {$ne: true}});
    }
    return _.groupBy(lessons.fetch(), 'date');
  },
  arrayify: function(obj) {
	result = [];
	for (var key in obj) {
	  result.push({date:key, value:obj[key]});
	}
	return result;
  }
});
