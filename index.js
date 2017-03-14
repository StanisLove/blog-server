var express = require('express');
var application = express();

var cors = require('cors');

var _ = require('lodash');

var items = require('./data').items;
var about = require('./data').about;

application.use(cors());

application.get('/', function(req, res) {
  res.json(items);
});

application.post('/', function(req, res) {
  const id = req.query['id']
  const posts = items.map(function(obj) {
    if (obj.id == id) {
      obj.meta.likeCount = _.get(obj, 'meta.likeCount', 0) + 1;
    }
    return obj;
  });
  res.json(posts)
});

application.get('/posts/:postId', function(req, res) {
  res.json(items.filter((obj) => obj.id == req.params.postId)[0]);
});

application.post('/posts/:postId', function(req, res) {
  const post = items.filter((obj) => obj.id == req.params.postId)[0];
  post.meta.likeCount = _.get(post, 'meta.likeCount', 0) + 1;
  res.json(post)
});

application.get('/about', function(req, res) {
  res.json(about);
});

application.listen(3011, function() {
  console.log('Server on 3011')
});
