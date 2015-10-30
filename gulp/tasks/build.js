'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');
var cssnext = require("gulp-cssnext");
var gutil = require('gulp-util');
var dest = './dist';

gulp.task('build', function(done) {
  return runSequence(
    'build:js',
    'build:css',
    'build:html',
    'build:manifest',
    'build:injection',
    done
  );
});

gulp.task('build:html', function() {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest(dest));
});



gulp.task('build:js', function() {

  var bundler = watchify(browserify({
    entries: ['src/js/index.js'],
    insertGlobals: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));

  bundler.transform(babelify);

  bundler.on('update', rebundle);

  function rebundle() {
    console.log('Browserify!');
    return bundler.bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(dest + '/js'));
  }

  return rebundle();
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

gulp.task('build:injection', function() {
  return gulp.src('./src/background.js')
    .pipe(gulp.dest(dest));
});
