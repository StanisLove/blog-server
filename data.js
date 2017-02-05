module.exports = {
  about: {
    title: 'This is amazing Blog',
    text: 'Some amazing text about our amazing blog...'
  },
  items: [
    {
      id: 1,
      title: 'React',
      text: 'Some text about React',
      image: {
        src: '/dist/images/react.png',
        alt: 'React picture',
        width: 'auto',
        height: '100px'
      },
      meta: {
        author: { firstName: 'Ivan', lastName: 'Ivanov' },
        postDates: { createdAt: '2011-01-01', updatedAt: '2011-02-01' },
        likeCount: 5
      }
    },
    {
      id: 2,
      title: 'Babel',
      text: 'Some text about Babel',
      image: {
        src: '/dist/images/babel.png',
        alt: 'Babel picture',
        width: 'auto',
        height: '100px'
      },
      meta: {
        author: { firstName: 'Bread', lastName: 'Pitt' },
        postDates: { createdAt: '2014-10-08', updatedAt: '2015-01-02' },
        likeCount: 3
      }
    },
    {
      id: 3,
      title: 'Lodash',
      text: 'Some text about Lodash',
      image: {
        src: '/dist/images/lodash.png',
        alt: 'Lodash picture',
        width: 'auto',
        height: '100px'
      },
      meta: {
        author: { firstName: 'Duke', lastName: 'Nukem' },
        postDates: { createdAt: '1995-08-10', updatedAt: '1996-12-24' }
      }
    }
  ]
};
