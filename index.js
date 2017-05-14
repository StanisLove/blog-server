var express = require('express');
var bodyParser = require('body-parser');
var application = express();
var db = require('./db');

var validate = require('./validate');

var cors = require('cors');

var _ = require('lodash');

var Post = require('./models/post.js');
var Comment = require('./models/comment.js');
var StatPage = require('./models/static_page.js');

application.use(cors());

application.use(bodyParser.json());

application.get('/', function(req, res) {
  Post.getAllWithComments(function(err, posts) {
    if (err) return console.log(err);
    res.json(posts);
  })
});

application.post('/', function(req, res) {
  values = req.query.values
  Post.updateById(values.id, values, function(err, success) {
    if (err) return console.log(err);
    Post.getAll(function(err, posts) {
      if (err) return console.log(err);
      res.json(posts);
    })
  })
});

application.get('/posts/:postId', function(req, res) {
  const id = req.params['postId'];
  Post.getByIdWithComments(id, function(err, post) {
    if (err) return console.log(err);
    res.json(post);
  })
});

application.post('/posts/:postId', function(req, res) {
  const id = req.params['postId'];
  values = req.query.values;
  Post.getAll(function(err, posts) {
    if (err) return console.log(err);
    if (validate(posts, values).valid) {
      Post.updateById(id, values, function(err, success) {
        if (err) return console.log(err);
        Post.getById(id, function(err, post) {
          if (err) return console.log(err);
          res.json(post);
        });
      });
    } else {
      res.status(422).json(validate(posts, values));
    }
  });
});

application.get('/posts/:postId/validate_fields', function(req, res) {
  values = req.query.values;
  Post.getAll(function(err, posts) {
    if (err) return console.log(err);
    res.json(validate(posts, values));
  });
});

application.post('/posts/:postId/comment', function(req, res) {
  postId = req.params.postId;
  body = req.body.values.comment;
  Comment.create(postId, body, function(err, id) {
    if (err) return console.log(err);
    Comment.getById(id, function(err, row) {
      if (err) return console.log(err);
      res.json(row[0]);
    });
  });
});

application.get('/about', function(req, res) {
  StatPage.getByPath(req.path, function(err, row) {
    if (err) return console.log(err);
    res.json(row[0]);
  });
});

db.connect(db.MODE_DEV, function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  } else {
    application.listen(3011, function() {
      console.log('Server on 3011');
    })
  }
});
