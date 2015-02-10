Meteor.publish('businesses', function() {
  return Businesses.find();
});
