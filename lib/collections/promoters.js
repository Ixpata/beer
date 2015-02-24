Promoters = new Mongo.Collection('promoters');

Promoters.allow({
  update: function(userId, promoter) { return ownsDocument(userId, promoter); },
  remove: function(userId, promoter) { return ownsDocument(userId, promoter); },
});

Promoters.deny({
  update: function(userId, promoter, fieldNames) {
    //may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Meteor.methods({
  promoterInsert: function(promoterAttributes) {
    check(this.userId, String);
    check(promoterAttributes, {
      title: String,
      url: String
    });

    if (Meteor.isServer) {
      promoterAttributes.title += "(server)";
      Meteor._sleepForMs(5000);
    } else {
      promoterAttributes.title += "(client)";
    }

    var promoterWithSameLink = Promoters.findOne({url: promoterAttributes.url});
    if (promoterWithSameLink) {
      return {
        promoterExists: true,
        _id: promoterWithSameLink._id
      }
    }

    var user = Meteor.user();
    var promoter = _.extend(promoterAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date()
    });
    
    var promoterId = Promoters.insert(promoter);
    
    return {
      _id: promoterId
    };
  }
});
