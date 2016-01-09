(function () {
  'use strict';

  /**
   * Application main module.
   */
  var m = angular.module('tynkki', [
    // library dependencies
    'ui.router',
    'ui.bootstrap',
    'ngResource',

    // view modules
    'tynkki.postList',
    'tynkki.post',

    // used directives
    'tynkki.directives.sideNavLink'
  ]);

  // Configure ui-router to go to the all posts list view by default
  m.config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/postList');
  });
})();
