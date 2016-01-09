'use strict';

/**
 * Mini web server using the express library. Serves the frontend application and offers a minimal REST API
 * for storing posts for the lifetime of the server process.
 */

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

/** Serve the frontend to the browser */
app.use('/', express.static(__dirname + '/../app'));
app.use('/node_modules', express.static(__dirname + '/../node_modules'));

/** Expose posts REST API */
app.use(bodyParser.json());
app.use('/api/posts', require('./posts'));

var server = app.listen(2806, function () {
  var port = server.address().port;
  console.log('Visit tynkki by opening http://localhost:%s in Chrome', port);
});
