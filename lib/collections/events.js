Events = new Mongo.Collection('events');

Events.before.insert(function (userId, doc) {
  doc.createdAt = Date.now();
  doc.createdBy = userId;
});

Events.attachSchema(new SimpleSchema({
  type: {
    optional: true,
    type: String,
    autoform: {
      type: "select-radio-inline",
      options: function () {
        return [
          {label: "Dance", value: "Dance"},
          {label: "Class", value: "Class"}
        ];
      }
    }
  },
  style: {
    optional: true,
    type: String
  },
  name: {
    optional: true,
    type: String
  },
  photo: {
    optional: true,
    type: String
  },
  video: {
    optional: true,
    type: String
  },
  frequency: {
    optional: true,
    type: String
  },
  website: {
    optional: true,
    type: String
  },
  ages: {
    optional: true,
    type: String
  },
  description: {
    optional: true,
    type: String
  },
  createdAt: {
    optional: true,
    type: Date
  },
  createdBy: {
    optional: true,
    type: String
  }
}));

Events.allow({
  update: function(userId, event) { return ownsDocument(userId, event); },
  remove: function(userId, event) { return ownsDocument(userId, event); }
});

Events.deny({
  update: function(userId, event, fieldNames) {
    //may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Meteor.methods({
  eventInsert: function(eventAttributes) {
    check(this.userId, String);
    check(eventAttributes, {
      title: String,
      url: String
    });

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
