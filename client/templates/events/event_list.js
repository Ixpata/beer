Template.eventsList.events({
  "change .only-beginner input": function (event) {
    Session.set("onlyBeginner", event.target.checked);
  }
});

Template.eventsList.helpers({
  arrayify: function (obj) {
    result = [];
    for (var key in obj) {
      result.push({date:key, value:obj[key]});
    }
    return result;
  },
  groupedDates: function () {
    var selector = {};
    if (Session.get("onlyBeginner")) {
      selector = {level: "Beginner"};
    }
    return _.groupBy(Events.find(selector).fetch(), 'date');
  }
});
