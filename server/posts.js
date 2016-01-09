/**
 * Implementation for the /api/posts REST API
 */

var express = require('express');
var posts = express.Router();

posts.route('/')
  .get(function getPosts(req, res) {
    res.send('TODO');
  });

module.exports = posts;
