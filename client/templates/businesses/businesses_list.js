Template.businessesList.helpers({
  businesses: function() {
    return Businesses.find();
  }
});
