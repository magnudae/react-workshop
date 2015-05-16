var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var nodemon = require('gulp-nodemon');
var gutil = require('gulp-util');
var concat      = require('gulp-concat');
var browserify = require('gulp-browserify');
var jshint      = require('gulp-jshint');
var hbsfy = require('hbsfy');
var es6ify = require('es6ify');

var styleDir = './public/stylesheets';


gulp.task('less', function () {
  return gulp.src('public/stylesheets/*.less')
    .pipe(less({
      paths: [ styleDir ]
    }))
    .pipe(gulp.dest('public/stylesheets/css'));
});

gulp.task('watch', function(callback) {
  gulp.watch('public/stylesheets/less/*.less', ['less']);
  gulp.watch('templates/*.hbs', ['build']);

  callback();
});

gulp.task('build', ['less', 'browserify'], function(callback) {
  callback();
});

gulp.task('run', ['build', 'watch'], function(callback) {
  nodemon({
    script: 'bin/server.js',
    ext: 'js',
    ignore: ['node_modules/**', 'public/dist/client.js'],
    legacyWatch: true
  })
    .on('restart', function() {
      gulp.start('build');
      gutil.log('server restarted!');
    });

  callback();
});




gulp.task('browserify', function() {
  gulp.src('public/js/*.js')
    .pipe(browserify({
      transform: [hbsfy, es6ify]
    }))
    .pipe(concat('client.js'))
    .pipe(gulp.dest('public/dist'));
});

// jshint

gulp.task('jshint', function() {
  return gulp.src(['./**/*.js', '!node_modules/**/*.js', '!test/dest/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
