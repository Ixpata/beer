if (Lessons.find().count() === 0) {
  Lessons.insert({
    style: 'Swing',
    level: 'Beginner',
    dateTime: 'Tuesday, December 9, 8 pm',
    
    name: 'Beginner 8-Count Lindy Hop (Week 3 of 4)',
    url: 'http://thejamcellar.com',
    description: '',
    location: 'Jam Cellar',
    
    price: 'Free',
    
    danceAfter: true,
    instructors: ['Hugh Beaumont'],
    
    

  });

  Locations.insert({
    name: 'Jam Cellar',
    url: 'http://thejamcellar.com',
    address: 'Josephine Butler Parks Center, 2437 Fifteenth Street, NW, Washington, DC 20009',
  });
}
