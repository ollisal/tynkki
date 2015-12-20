'use strict';

/**
 * Mini web server using the express library, that currently only exists so that we can
 * XHR load parts of the frontend.
 */

var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/../app'));
app.use('/node_modules', express.static(__dirname + '/../node_modules'));

var server = app.listen(2806, function () {
  var port = server.address().port;
  console.log('Visit tynkki by opening http://localhost:%s in Chrome', port);
});
