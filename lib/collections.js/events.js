Events = new Mongo.Collection('events');

Meteor.methods({
  eventInsert: function(eventAttributes) {
    check(this.userId, String);
    check(eventAttributes, {
      title: String,
      url: String
    });

    if (Meteor.isServer) {
      eventAttributes.title += "(server)";
      Meteor._sleepForMs(5000);
    } else {
      eventAttributes.title += "(client)";
    }

    var eventWithSameLink = Events.findOne({url: eventAttributes.url});
    if (eventWithSameLink) {
      return {
        eventExists: true,
        _id: eventWithSameLink._id
      }
    }

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
