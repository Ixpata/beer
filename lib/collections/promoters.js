Promoters = new Mongo.Collection('promoters');
Promoters.attachSchema(new SimpleSchema({
  userId: {
    optional: true,
    type: String
  },
  name: {
    optional: true,
    type: String
  },
  image: {
    optional: true,
    type: String
  },
  website: {
    optional: true,
    type: String
  },
  email: {
    optional: true,
    type: String
  },
  photos: {
    optional: true,
    type: Array
  },
  'photos.$': {
    type: Object
  },
  'photos.$.url': {
    type: String
  },
  videos: {
    optional: true,
    type: Array
  },
  'videos.$': {
    type: Object
  },
  'videos.$.url': {
    type: String
  },
  testimonials: {
    optional: true,
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
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
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
