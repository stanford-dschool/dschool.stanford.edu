const gulp = require('gulp')
const watch = require('gulp-watch')
const config = require('../config')
const run = require('run-sequence')
const livereload = require('gulp-livereload')

gulp.task('watch', () => {
  watch(config.styles.src, () => run('styles'))
  watch(config.images.src, () => run('images'))
  watch(config.scripts.src, () => run('scripts'))
  watch(config.templates.src, () => run('templates'))

  livereload.listen()
})
