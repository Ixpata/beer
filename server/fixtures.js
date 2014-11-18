if (Events.find().count() === 0) {
  Events.insert({
    title: 'Jam Cellar',
    url: 'http://thejamcellar.com'
  });
  
  Events.insert({
    title: 'Glen Echo',
    url: 'http://glenechopark.gov'
  });
  
  Events.insert({
    title: 'Chevy Chase Ballroom',
    url: 'http://gottaswing.com'
  });
}
