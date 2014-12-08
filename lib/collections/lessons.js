Lessons = new Mongo.Collection('lessons');

Lessons.allow({
  update: function(userId, lesson) { return ownsDocument(userId, lesson); },
  remove: function(userId, lesson) { return ownsDocument(userId, lesson); },
});

Lessons.deny({
  update: function(userId, lesson, fieldNames) {
    //may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Meteor.methods({
  lessonInsert: function(lessonAttributes) {
    check(this.userId, String);
    check(lessonAttributes, {
      title: String,
      url: String
    });

    if (Meteor.isServer) {
      lessonAttributes.title += "(server)";
      Meteor._sleepForMs(5000);
    } else {
      lessonAttributes.title += "(client)";
    }

    var lessonWithSameLink = Lessons.findOne({url: lessonAttributes.url});
    if (lessonWithSameLink) {
      return {
        lessonExists: true,
        _id: lessonWithSameLink._id
      }
    }

    var user = Meteor.user();
    var lesson = _.extend(lessonAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date()
    });
    
    var lessonId = Lessons.insert(lesson);
    
    return {
      _id: lessonId
    };
  }
});
