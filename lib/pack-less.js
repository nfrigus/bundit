const
  gulp = require('gulp'),
  rename = require('gulp-rename'),
  less = require('gulp-less'),
  path = require('path'),
  sourcemaps = require('gulp-sourcemaps');

module.exports = (src, dest) => () => {
  let
    stream = gulp.src(src)
      .pipe(sourcemaps.init())
      .pipe(less({
        compress: true
      }));

  if ('.css' == path.parse(dest).ext) {
    stream = stream.pipe(rename(path.basename(dest)));
    dest = path.dirname(dest);
  }

  return stream
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest));
};
