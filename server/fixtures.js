if (Lessons.find().count() === 0) {
  Lessons.insert({
    title: 'Jam Cellar',
    url: 'http://thejamcellar.com'
  });
  
  Lessons.insert({
    title: 'Glen Echo',
    url: 'http://glenechopark.gov'
  });
  
  Lessons.insert({
    title: 'Chevy Chase Ballroom',
    url: 'http://gottaswing.com'
  });
}
