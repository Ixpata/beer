Template.lessonsList.helpers({
	lessons: function() {
		return Lessons.find({}, {sort: {submitted: -1}});
	},
	groupedDates: function() {
		return _.groupBy(Lessons.find().fetch(), 'date');
	},
	arrayify: function(obj) {
		result = [];
		for (var key in obj) {
			result.push({date:key, value:obj[key]});
		}
		return result;
	}
});
