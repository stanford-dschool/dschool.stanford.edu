const gulp = require('gulp')
const livereload = require('gulp-livereload')
const config = require('../config')

gulp.task('images', () =>
  gulp.src(config.images.src)
    .pipe(gulp.dest(config.images.target))
    .pipe(livereload()))
