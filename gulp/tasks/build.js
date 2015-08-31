'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');
var cssnext = require("gulp-cssnext");
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
  return browserify('src/js/index.js', { debug: true })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(dest + '/js'));

});

gulp.task('build:css', function() {
  return gulp.src('./src/css/**/*.css')
    .pipe(cssnext())
    .pipe(gulp.dest(dest + '/css'));
});

gulp.task('build:manifest', function() {
  return gulp.src('./src/manifest.json')
    .pipe(gulp.dest(dest));
});
