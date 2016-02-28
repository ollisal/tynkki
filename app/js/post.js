(function () {
  'use strict';

  /**
   * Module implementing viewing and editing a single post.
   */
  var m = angular.module('tynkki.post', [
    'tynkki.services.posts',
    'tynkki.directives.pizzaList',
    'tynkki.directives.postInfoRow'
  ]);

  // Set up the state with ui-router.
  m.config(function ($stateProvider) {
    $stateProvider.state('post', {
      url: '/post/:id',
      controller: 'PostController',
      controllerAs: 'ctrl',
      templateUrl: 'templates/post.html'
    }).state('editPost', {
      url: '/editPost/:id',
      controller: 'EditPostController',
      controllerAs: 'ctrl',
      templateUrl: 'templates/edit-post.html'
    });
  });

  m.controller('PostController', function ($stateParams, tynkkiPosts) {
    this.post = tynkkiPosts.get({postId: $stateParams.id});
  });

  m.controller('EditPostController', function ($stateParams, $state, tynkkiPosts) {
    this.post = tynkkiPosts.get({postId: $stateParams.id});

    this.savePost = function saveEditedPost() {
      this.post.$update(function () {
        $state.go('postList');
      });
    };
  });
})();
