const gulp = require('gulp')
const gutil = require('gulp-util')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('../../webpack.config')

gulp.task('scripts', callback => {
  const myConfig = Object.create(webpackConfig)

  if (config.env.minify) {
    myConfig.plugins = [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
    ]
  }

  webpack(myConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('scripts', err)
    }

    gutil.log('webpack', stats.toString({
      chunks: false,
      colors: true,
    }))

    callback()
  })
})
