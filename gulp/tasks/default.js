const gulp = require('gulp')
const runSequence = require('run-sequence')
const config = require('../config')

gulp.task('default', () => {
  runSequence('styles', 'templates', 'images', 'scripts')
  if (config.env.watch) {
    gulp.start('watch')
  }
})
