(function () {
  'use strict';

  /**
   * Directive for showing the side navigation links.
   */
  var m = angular.module('tynkki.directives.sideNavLink', []);

  m.directive('tynkkiSideNavLink', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/side-nav-link.directive.html',
      controller: function () {},
      controllerAs: 'link',
      scope: {
        icon: '@',
        text: '@',
        postId: '@'
      },
      bindToController: true,
      replace: true
    };
  });
})();
