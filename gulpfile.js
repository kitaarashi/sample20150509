'use strict'
//var gulp = require('gulp');
//gulp.task('foo', function() {
//  console.log('hello world');
//});

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    browserify = require('browserify'),
    transform = require('vinyl-transform'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    reactify = require('reactify');

gulp.task('js', function(){
  var browserified = transform(function(filename){
    var b = browserify(filename);
    b.add(filename);
    return b.bundle();
  });

  return gulp.src('./src/*.js')
    .pipe(browserified)
    .pipe($.uglify())
    .pipe($.sourcemaps.init({'loadMaps':true}))
    .pipe($.sourcemaps.write('./map'))
    .pipe(gulp.dest('./dist/'));
});


gulp.task('react', function(){
  return browserify({
      debug : true,
//      entries : gulp.src('./src/main.js'),
      entries : './src/main.js',
      transform: [reactify]
    })
    .bundle()
    .pipe(source('app.min.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({'loadMaps':true}))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('./map'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('react-full', function(){
  return browserify({
    entries : './src/main.js',
    transform : [reactify]
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function(){
  gulp.watch('./src/*.js', ['react']);
});
