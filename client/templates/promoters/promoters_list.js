Template.promotersList.helpers({
  promoters: function() {
    return Promoters.find();
  }
});
