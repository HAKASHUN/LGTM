'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var dest = './dist';

gulp.task('build', function(done) {
  return runSequence(
    'build:js',
    'build:css',
    'build:html',
    'build:manifest',
    done
  );
});

gulp.task('build:html', function() {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest(dest));
});

gulp.task('build:js', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(gulp.dest(dest + '/js'));
});

gulp.task('build:css', function() {
  return gulp.src('./src/css/**/*.css')
    .pipe(gulp.dest(dest + '/css'));
});

gulp.task('build:manifest', function() {
  return gulp.src('./src/manifest.json')
    .pipe(gulp.dest(dest));
});
