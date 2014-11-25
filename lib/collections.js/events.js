Events = new Mongo.Collection('events');

Meteor.methods({
  eventInsert: function(eventAttributes) {
    check(Meteor.userId(), String);
    check(eventAttributes, {
      title: String,
      url: String
    });
    
    var user = Meteor.user();
    var event = _.extend(eventAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date()
    });
    
    var eventId = Events.insert(event);
    
    return {
      _id: eventId
    };
  }
});
