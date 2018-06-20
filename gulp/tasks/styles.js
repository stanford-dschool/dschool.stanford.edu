const gulp = require('gulp')
const less = require('gulp-less')
const stylelint = require('gulp-stylelint')
const inject = require('gulp-inject-string')
const Autoprefixer = require('less-plugin-autoprefix')
const LessPluginCleanCSS = require('less-plugin-clean-css')
const runSequence = require('run-sequence')
const livereload = require('gulp-livereload')
const config = require('../config')

gulp.task('styles-lint', () =>
  gulp.src(config.styles.src).pipe(stylelint({
    failAfterError: false,
    reporters: [{
      formatter: 'string',
      console: true,
    }],
  }))
)
gulp.task('styles-update-cache', () =>
  gulp.src(config.cacheInject.entry)
    .pipe(inject.replace(config.cacheInject.pattern, `?cache=${Date.now()}'`))
    .pipe(gulp.dest(config.cacheInject.target))
)

gulp.task('styles-build', () => {
  const plugins = [
    new Autoprefixer({ browsers: ['last 4 versions'] }),
  ]

  if (config.env.minify) {
    plugins.push(new LessPluginCleanCSS())
  }

  gulp.src(config.styles.entry.base)
    .pipe(less({
      plugins,
      paths: [config.styles.src],
    }))
    .pipe(gulp.dest(config.styles.target.base))
    .pipe(livereload())

  gulp.src(config.styles.entry.other)
    .pipe(less())
    .pipe(less({
      plugins,
      paths: [config.styles.src],
    }))
    .pipe(gulp.dest(config.styles.target.other))
    .pipe(livereload())
})

gulp.task('styles', () => {
  runSequence('styles-lint', 'styles-build', 'styles-update-cache')
})
