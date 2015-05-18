var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var nodemon = require('gulp-nodemon');
var gutil = require('gulp-util');
var concat      = require('gulp-concat');
var connect = require('gulp-connect');
//var browserify = require('gulp-browserify');
var browserify = require('browserify');
var jshint      = require('gulp-jshint');
var hbsfy = require('hbsfy');
var es6ify = require('es6ify');

var source = require('vinyl-source-stream');
var watchify = require('watchify');
var envify = require('envify');
var reactify = require('reactify');
var react = require('gulp-react');
var uglify = require('gulp-uglify');
var plumber =require('gulp-plumber');
var glob = require('glob');

var styleDir = './public/stylesheets';
var scriptDir = 'client/scripts/';
var destDir = 'client/dist/';


gulp.task('server', function() {
  connect.server({
    root: './client',
    port: 4000,
    livereload: true
  });
});

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

gulp.task('build', ['less'], function(callback) {
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


var compileScripts = function(opts) {
  var entryFile = scriptDir + 'app.js';
  var bundles = [ es6ify.runtime, entryFile ];
  if (opts.test) {
    var testFiles = glob.sync(testDir + '**/*.js');
    bundles = bundles.concat(testFiles);
  }
  var bOpts = {
    // Required watchify args
    cache: {},
    packageCache: {},
    fullPaths: true,
    // Browserify options
    debug: opts.debug === true
  };

  es6ify.traceurOverrides = { experimental: true, blockBinding: true };

  var bundler = browserify(bundles, bOpts);

  var bundle = function() {
    gutil.log('Transforming scripts from JSX and ES6 to ES5...');
    return bundler
      .bundle()
      .on('error', gutil.log)
      .pipe(source(opts.appFile || 'app.js'))
      .pipe(gulp.dest(destDir))
      .pipe(connect.reload());
  };

  if (opts.test) {
    bundler.plugin(proxyquire.plugin);
  }

  bundler
    .transform(envify)
    .transform(reactify)
    .transform(es6ify.configure(/^(?!.*node_modules)+.+\.js$/));

  if (opts.watch) {
    bundler = watchify(bundler).on('update', bundle);
  }

  return bundle();
};

gulp.task('lint', function () {
  return gulp.src(['gulpfile.js', scriptDir + '**/*'])
    .pipe(plumber())
    .pipe(react())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', ['lint', 'server'], function () {
  return compileScripts({ watch: false, debug: false });
});

gulp.task('compress', ['scripts'], function () {
  return gulp.src(destDir + 'app.js')
    .pipe(uglify())
    .pipe(gulp.dest(destDir));
});

