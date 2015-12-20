(function () {
  'use strict';

  /**
   * Module implementing viewing and editing a single post.
   */
  var m = angular.module('tynkki.post', []);

  // Set up the state with ui-router.
  m.config(function ($stateProvider) {
    $stateProvider.state('post', {
      url: '/post/:id',
      controller: 'PostController',
      controllerAs: 'ctrl',
      templateUrl: 'templates/post.html',

      // https://github.com/angular-ui/ui-router/wiki#resolve
      resolve: {
        post: function getPost($stateParams, tynkkiPosts) {
          // The lodash library (https://lodash.com/docs) has a nice collection of functionally
          // oriented utilites. We are using the chaining functionality and the find() method to
          // easily find the correct post among all posts, persistent or otherwise.
          var postId = $stateParams.id;
          var allPosts = _(tynkkiPosts.persistent).concat(tynkkiPosts.other);
          return allPosts.find('id', postId);
        }
      }
    });
  });

  m.controller('PostController', function (post) {
    this.post = post;
  });
})();
