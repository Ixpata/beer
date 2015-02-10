Template.eventsList.events({
  "change .beginner input": function (event) {
    Session.set("Beginner", event.target.checked);
  },
  "change .intermediate input": function (event) {
    Session.set("Intermediate", event.target.checked);
  }
});

function addFacet(or, facet) {
  if (Session.get(facet)) {
    or.push({level: facet});
  } 
}

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
    var or = []; 
    addFacet(or, 'Beginner');
    addFacet(or, 'Intermediate');
    if (or.length > 0) {
      selector = {$or: or};
    }
    return _.groupBy(Events.find(selector).fetch(), 'date');
  }
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('dddd, MMMM DD');
});
