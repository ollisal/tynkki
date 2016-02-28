(function () {
  'use strict';

  /**
   * Directive for showing info of a post.
   */
  var m = angular.module('tynkki.directives.postInfoRow', []);

  m.directive('tynkkiPostInfoRow', function () {
    return {
      restrict: 'E',
      scope: {
        post: '='
      },
      templateUrl: 'templates/post-info-row.directive.html'
    };
  });
})();
