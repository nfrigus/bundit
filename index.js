const
  add = require('gulp-add'),
  babel = require('babelify'),
  browserify = require('browserify'),
  buffer = require('vinyl-buffer'),
  concat = require('gulp-concat'),
  gulp = require('gulp'),
  path = require('path'),
  source = require('vinyl-source-stream'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify');

module.exports = function (src, dest, opt = {}) {
  dest = path.parse(dest);

  return function () {
    let stream = browserify(src, {
      debug: true
    })
      .transform(babel, {
        presets: ["es2015"],
        sourceMaps: true
      })
      .bundle()
      .on('error', function (err) {
        console.error(err);
        this.emit('end');
      })
      .pipe(source(dest.base))
      .pipe(buffer());

    if (opt.license) {
      stream = stream
        .pipe(add('LICENSE', opt.license, true))
    }

    stream
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(concat(dest.base))
      .pipe(uglify({preserveComments: 'license'}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(dest.dir));
  }
};
