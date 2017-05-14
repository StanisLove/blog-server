var Post = require('./models/post.js');

module.exports = function(posts, values) {
  valid = !posts.some(obj => obj.title == values.title && obj.id != values.id)
  if (valid)
    return { valid: true }
  else
    return { title: `Title ${values.title} already exists` }
}
