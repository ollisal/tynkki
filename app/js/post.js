(function () {
  'use strict';

  /**
   * Module implementing viewing and editing a single post.
   */
  var m = angular.module('tynkki.post', [
    'tynkki.services.posts',
    'tynkki.directives.pizzaList'
  ]);

  // Set up the state with ui-router.
  m.config(function ($stateProvider) {
    $stateProvider.state('post', {
      url: '/post/:id',
      controller: 'PostController',
      controllerAs: 'ctrl',
      templateUrl: 'templates/post.html'
    });
  });

  m.controller('PostController', function ($stateParams, tynkkiPosts) {
    this.post = tynkkiPosts.get({postId: $stateParams.id});
  });
})();
