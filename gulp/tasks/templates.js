const gulp = require('gulp')
const runSequence = require('run-sequence')
const config = require('../config')

gulp.task('templates-build', () =>
  gulp.src(config.templates.src)
    .pipe(gulp.dest(config.templates.target))
)

gulp.task('templates', () => {
  runSequence('templates-build', 'styles-update-cache')
})
