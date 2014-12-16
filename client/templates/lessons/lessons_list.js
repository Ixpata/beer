Template.lessonsList.helpers({
	lessons: function() {
		return Lessons.find({}, {sort: {submitted: -1}});
	},
	groupedDates: function() {
		return _.groupBy(_.pluck(Lessons.find().fetch(), 'dateTime'));
	},
	arrayify: function(obj) {
		result = [];
		for (var key in obj) {
			result.push({date:key, value:obj[key]});
		}
		return result;
	}
});
