(function () {
  'use strict';

  /**
   * Posts service module.
   */
  var m = angular.module('tynkki.services.posts', []);

  m.factory('tynkkiPosts', function ($resource) {
    return $resource('/api/posts/:postId', {postId: '@id'}, {
      update: { method: 'PUT' }
    });
  });
})();
