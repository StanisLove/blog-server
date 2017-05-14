var db = require('../db.js');

exports.create = function(postId, body, done) {
  db.get().query(`INSERT INTO comments (post_id, body) VALUES(${postId}, '${body}')`, function (err, result) {
    if (err) return done(err)
    done(null, result.insertId)
  })
};

exports.getById = function(id, done) {
  db.get().query(`SELECT * FROM comments WHERE id = ${id}`, function(err, row) {
    if (err) return done(err);
    done(null, row);
  })
};

exports.getAllByPostId = function(postId, done) {
  db.get().query(`SELECT * FROM comments WHERE post_id = ${postId}`, function(err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
};
