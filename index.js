var express = require('express');
var application = express();

var cors = require('cors');

var items = require('./data').items;
var about = require('./data').about;

application.use(cors());

application.get('/', function(req, res) {
  res.json(items);
});

application.get('/about', function(req, res) {
  res.json(about);
});

application.listen(3011, function() {
  console.log('Server on 3011')
});
