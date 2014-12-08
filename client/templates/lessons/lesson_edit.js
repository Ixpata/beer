Template.lessonEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var currentLessonId = this._id;
    
    var lessonProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    }
    
    Lessons.update(currentLessonId, {$set: lessonProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('lessonPage', {_id: currentLessonId});
      }
    });
  },
  
  'click .delete': function(e) {
    e.preventDefault();
    
    if (confirm("Delete this lesson?")) {
      var currentLessonId = this._id;
      Lessons.remove(currentLessonId);
      Router.go('lessonsList');
    }
  }
});
