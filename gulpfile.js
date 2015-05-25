var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var browserify = require('browserify');
var es6ify = require('es6ify');

var source = require('vinyl-source-stream');
var watchify = require('watchify');
var envify = require('envify');
var reactify = require('reactify');
var glob = require('glob');

var jsonServer = require('json-server')
var nodemon = require('gulp-nodemon');

var scriptDir = 'client/scripts/';
var destDir = 'client/dist/';


gulp.task('client-server', function() {
  connect.server({
    root: './client',
    port: 4000,
    livereload: true
  });
});

gulp.task('server', function() {
  nodemon({
    script: 'server/server.js'
  });
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

gulp.task('client', ['client-server'], function () {
  return compileScripts({ watch: false, debug: false });
});

gulp.task('default', ['server', 'client']);
