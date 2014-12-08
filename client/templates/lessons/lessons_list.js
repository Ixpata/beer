Template.lessonsList.helpers({
  lessons: function() {
    return Lessons.find({}, {sort: {submitted: -1}});
  }
});
