Promoters = new Mongo.Collection('promoters');
Promoters.attachSchema(new SimpleSchema({
  name: {
    type: String
  },
  image: {
    type: String
  },
  website: {
    type: String
  },
  email: {
    type: String
  },
  photos: {
    type: Array
  },
  'photos.$': {
    type: Object
  },
  'photos.$.url': {
    type: String
  },
  videos: {
    type: Array
  },
  'videos.$': {
    type: Object
  },
  'videos.$.url': {
    type: String
  },
  testimonials: {
    type: Array
  },
  'testimonials.$': {
    type: Object
  },
  'testimonials.$.name': {
    type: String
  },
  'testimonials.$.quote': {
    type: String
  }
}));

Promoters.allow({
  update: function(userId, promoter) { return ownsDocument(userId, promoter); },
  remove: function(userId, promoter) { return ownsDocument(userId, promoter); }
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
