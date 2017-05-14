var data = {
  tables: {
    stat_pages: [
      {
        title: 'This is amazing Blog',
        text: 'Some amazing text about our amazing blog...',
        path: '/about'
      }
    ],
    posts: [
      {
        id: 1,
        title: 'React',
        text: 'Some text about React',
        like_count: 5,
        image: JSON.stringify({
          src: '/images/react.png',
          alt: 'React picture',
          width: 'auto',
          height: '100px'
        }),
        meta: JSON.stringify({
          author: { firstName: 'Ivan', lastName: 'Ivanov' },
          postDates: { createdAt: '2011-01-01', updatedAt: '2011-02-01' }
        })
      },
      {
        id: 2,
        title: 'Babel',
        text: 'Some text about Babel',
        like_count: 3,
        image: JSON.stringify({
          src: '/images/babel.png',
          alt: 'Babel picture',
          width: 'auto',
          height: '100px'
        }),
        meta: JSON.stringify({
          author: { firstName: 'Bread', lastName: 'Pitt' },
          postDates: { createdAt: '2014-10-08', updatedAt: '2015-01-02' },
        })
      },
      {
        id: 3,
        title: 'Lodash',
        text: 'Some text about Lodash',
        image: JSON.stringify({
          src: '/images/lodash.png',
          alt: 'Lodash picture',
          width: 'auto',
          height: '100px'
        }),
        meta: JSON.stringify({
          author: { firstName: 'Duke', lastName: 'Nukem' },
          postDates: { createdAt: '1995-08-10', updatedAt: '1996-12-24' }
        })
      }
    ],
    comments: []
  }
};

var db = require('./db');

db.connect(db.MODE_DEV, function() {
  db.fixtures(data, function(err) {
    if (err) return console.log(err);
    console.log('Data has been loaded...');
  })
});
