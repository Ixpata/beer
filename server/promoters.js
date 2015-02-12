Meteor.publish('promoters', function() {
  return Promoters.find();
});
