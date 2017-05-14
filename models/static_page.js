var db = require('../db.js');

exports.getByPath = function(path, done) {
  db.get().query(`SELECT * FROM stat_pages WHERE path = '${path}'`, function(err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
};
