var gulp    = require('gulp'),
    uglify  = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    rename  = require('gulp-rename');

var paths = {
  src : './src/transgator.js',
  dist: './dist/'
};

gulp.task('js', function(){
  gulp
  .src(paths.src)
  .pipe(uglify())
  .pipe(rename('transgator.min.js'))
  .pipe(gulp.dest(
    paths.dist
  ))
});

gulp.task('watch', function(){
  gulp.watch(paths.src, ['js']);
})
