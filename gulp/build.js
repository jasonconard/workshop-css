'use strict';
var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

function handleError(err) {
  console.error(err.toString());
  this.emit('end');
}

gulp.task('styles', ['wiredep'], function () {
  return gulp.src('app/**/*.scss')
      .pipe($.rubySass({style: 'nested'}))
      .on('error', handleError)
      .pipe($.autoprefixer('last 1 version'))
      .pipe(gulp.dest('.tmp'))
      .pipe($.size());
});

gulp.task('scripts', function () {
  return gulp.src(['app/**/*.js', '!**/bower_components/**'])
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'))
      .pipe($.size());
});

gulp.task('json', function () {
  return gulp.src(['app/**/*.json', '!**/bower_components/**'])
      .pipe(gulp.dest('dist'))
      .pipe($.size());
});

gulp.task('partials', function () {
  return gulp.src('app/views/*.html')
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe($.ngHtml2js({
        moduleName: 'developer.designmyapp.mobi'
      }))
      .pipe(gulp.dest('.tmp'))
      .pipe($.size());
});


gulp.task('html', ['styles', 'scripts', 'partials', 'json'], function () {
  var htmlFilter = $.filter('**/*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;
  return gulp.src(['app/**/*.html', '!app/bower_components/**/*.html'])
      .pipe($.inject(gulp.src('.tmp/**/*.js'), {
        read: false,
        starttag: '<!-- inject:partials -->',
        addRootSlash: false,
        addPrefix: '../'
      }))
      .pipe(assets = $.useref.assets())
      .pipe($.rev())
      .pipe(jsFilter)
      .pipe($.ngAnnotate())
      .pipe($.uglify())
      .pipe(jsFilter.restore())
      .pipe(cssFilter)
      .pipe($.replace('bower_components/bootstrap-sass-official/assets/fonts/bootstrap','fonts'))
      .pipe($.csso())
      .pipe(cssFilter.restore())
      .pipe(assets.restore())
      .pipe($.useref())
      .pipe($.revReplace())
      .pipe(htmlFilter)
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe(htmlFilter.restore())
      .pipe(gulp.dest('dist'))
      .pipe($.size());
});

gulp.task('images', function () {
  return gulp.src(['app/images/**/*', '!**/bower_components/**'])
      .pipe(gulp.dest('dist/images'))
      .pipe($.size());
});

gulp.task('videos', function () {
  return gulp.src(['app/videos/**/*', '!**/bower_components/**'])
      .pipe(gulp.dest('dist/videos'))
      .pipe($.size());
});

gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
      .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
      .pipe($.flatten())
      .pipe(gulp.dest('dist/fonts'))
      .pipe($.size());
});

gulp.task('misc', function () {
  return gulp.src(['app/**/*.ico', '!**/bower_components/**'])
      .pipe(gulp.dest('dist'))
      .pipe($.size());
});

gulp.task('clean', function (done) {
  $.del(['.tmp', 'dist'], done);
});

gulp.task('copy', function() {
  return gulp.src(['app/scripts/libs/**/*.js', '!**/bower_components/**'])
      .pipe(gulp.dest('dist/scripts'));
});

gulp.task('css', function() {
  return gulp.src(['app/**/*.css', '!**/bower_components/**'])
      .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean'], function() {
  gulp.start(['html', 'images', 'videos', 'fonts', 'misc', 'copy', 'css']);
});