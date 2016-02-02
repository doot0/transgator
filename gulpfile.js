const gulp          = require('gulp'),
      uglify        = require('gulp-uglify'),
      rename        = require('gulp-rename'),
      runSequence   = require('run-sequence'),
      del           = require('del');

const paths = {
  src : './src/transgator.js',
  dist: './dist/'
};

gulp.task('clean', function() {
  del(['./dist/**/*']).then(paths => {
  	console.log('Cleaned files and folders:\n', paths.join('\n'));
  });;
});

gulp.task('build', () => {
  gulp.src(paths.src)
    .pipe(gulp.dest( paths.dist ))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest( paths.dist ));
});

gulp.task('watch', () => {
  gulp.watch(paths.src, ['js']);
});

gulp.task('default', (cb) => {
  runSequence('clean', ['build'], 'watch', cb);
});
