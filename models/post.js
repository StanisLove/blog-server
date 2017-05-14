var db = require('../db.js');
var humps = require('humps');
var _ = require('lodash');

function preparePost(row) {
  row.meta = JSON.parse(row.meta);
  row.meta.likeCount = Number(row.like_count);
  row.meta.created_at = Date(row.created_at);
  delete(row.like_count);
  row.image = JSON.parse(row.image);
  return row;
};

function preparePostsWithComments(rows) {
  var ids = rows.map(row => row.id)
    .filter((value, index, self) => self.indexOf(value) === index);

  var posts = ids.map(id => {
    post = preparePost(rows.find(row => row.id == id));
    post.comments = rows
      .filter(row => row.id == id)
      .map(row => {
        if (row.comment) return { id: row.comment_id, body: row.comment }
      })
      .filter(c => c);
    delete(post.comment);
    delete(post.comment_id);
    return post;
  })
  return posts;
};

exports.getAll = function(done) {
  db.get().query('SELECT * FROM posts', function(err, rows) {
    if (err) return done(err);
    posts = rows.map(function(row) { return preparePost(row) });
    return done(null, posts);
  })
};

exports.getAllWithComments = function(done) {
  db.get().query(
    `SELECT posts.*, comments.body as comment, comments.id as comment_id FROM posts \
    LEFT JOIN comments ON posts.id = comments.post_id`,
    function(err, rows) {
      if (err) return done(err);
      done(null, preparePostsWithComments(rows));
    }
  )
};

exports.getById = function(id, done) {
  db.get().query(`SELECT * FROM posts WHERE id = ${id}`, function(err, row) {
    if (err) return done(err);
    post = preparePost(row[0]);
    done(null, post);
  })
};

exports.getByIdWithComments = function(id, done) {
  db.get().query(
    `SELECT p.*, comments.body as comment, comments.id as comment_id FROM \
    (SELECT * FROM posts WHERE id = ${id}) as p \
    LEFT JOIN comments ON p.id = comments.post_id`,
    function(err, rows) {
      if (err) return done(err);
      done(null, preparePostsWithComments(rows)[0]);
    }
  )
};

exports.updateById = function(id, values, done) {
  values = _.mapKeys(values, function(value, key) {
    return humps.decamelize(key);
  });

  var str = '';
  var first = true;

  _.forIn(values, function(value, key) {
    switch(key) {
      case 'post_liked':
        key = 'like_count';
        value = 'like_count + 1';
        break
      case 'first_name':
        key = 'meta';
        value = `JSON_SET(meta, "$.author.firstName", "${value}")`
        break
      case 'last_name':
        key = 'meta';
        value = `JSON_SET(meta, "$.author.lastName", "${value}")`
        break
      case 'post_liked':
        key = 'like_count';
        value = 'like_count + 1';
        break
      default:
        value = `"${value}"`;
        break
    }
    str += `${first ? '' : ','} ${key} = ${value}`
    first = false;
  })

  if (str.length != 0) {
    db.get().query(`UPDATE posts SET ${str} WHERE id = ${id}`, function(err, row) {
      if (err) return done(err);
      done(null, row);
    })
  }
};
