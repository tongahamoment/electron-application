// include the required packages.
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var pug = require('gulp-pug');

// Get one .styl file and render
gulp.task('default', function () {
  gulp.src('./views/css/one.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./views/css/build'));
});

// Get one .styl file and render
gulp.task('comp', function () {
  return gulp.src('views/*.pug')
    .pipe(pug({
      // Your options in here.
    }))
    .pipe(gulp.dest('./client'));
});
