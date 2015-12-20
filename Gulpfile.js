/* jshint node: true */

'use strict';

/**
 * Build system for the project. To keep things simple, this is intentionally missing many of the
 * features commonly seen in production systems, such as minification, concatenation, module wrapping
 * etc.
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourceMaps = require('gulp-sourcemaps');
var gls = require('gulp-live-server');

var SERVER_MAIN_SCRIPT = 'server/index.js';

var PATHS = {
  BUILD_DIR: 'app/build',

  SCSS: [
    'app/scss/**/*.scss'
  ],

  SCSS_INCLUDE: [
    'node_modules/bootstrap-sass/assets/stylesheets'
  ]
};

gulp.task('styles', function () {
  return gulp.src(PATHS.SCSS)
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(PATHS.BUILD_DIR));
});

gulp.task('styles:watch', function () {
  return gulp.watch(PATHS.SCSS, ['styles']);
});

gulp.task('serve', ['styles'], function serve() {
  var server = gls(SERVER_MAIN_SCRIPT, {}, false /* no livereload, would be confusing */);

  // Restart server if it is changed
  gulp.watch(SERVER_MAIN_SCRIPT, function restartServer() {
    server.start();
  });

  server.start();
});

gulp.task('default', [
  'styles',
  'styles:watch',
  'serve'
]);
