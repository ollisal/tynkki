(function () {
  'use strict';

  /**
   * Module implementing the listing of all posts in the front page.
   */
  var m = angular.module('tynkki.postList', [
    'tynkki.services.posts',
    'tynkki.directives.postInfoRow'
  ]);

  // Set up the state with ui-router.
  m.config(function ($stateProvider) {
    $stateProvider.state('postList', {
      url: '/postList',
      controller: 'AllPostsController',
      controllerAs: 'allPosts',
      templateUrl: 'templates/post-list.html'
    });
  });

  m.controller('AllPostsController', function (tynkkiPosts) {
    this.posts = tynkkiPosts.query();
  });
})();
