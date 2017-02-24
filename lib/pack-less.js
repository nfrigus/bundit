const
  gulp = require('gulp'),
  less = require('gulp-less'),
  sourcemaps = require('gulp-sourcemaps');

module.exports = (src, dest) => gulp.src(src)
  .pipe(sourcemaps.init())
  .pipe(less({
    compress: true
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(dest));
