const gutil = require('gulp-util')

const environments = {
  development: {
    minify: false,
    watch: true,
  },
  production: {
    minify: true,
    watch: false,
  },
}

module.exports = {
  server: {},
  images: {
    target: './template/assets',
    src: './app/assets/**/*.{png,gif,jpg,jpeg,svg,pdf,eot,ttf,woff,woff2}',
  },
  templates: {
    target: './template',
    src: './app/**/*.{region,conf,list,item,block,page}',
  },
  scripts: {
    target: './template/scripts',
    src: [
      './app/scripts/**/*.js',
      './app/components/**/*.js',
    ],
  },
  cacheInject: {
    pattern: "\\?cache=.*\\'",
    entry: './template/*.region',
    target: './template',
  },
  styles: {
    target: {
      base: './template/styles',
      other: './template/assets',
    },
    entry: {
      base: './app/styles/base.less',
      other: ['./app/styles/enhance.less', './app/styles/fonts.less'],
    },
    src: './app/styles/**/*.less',
  },
  env: environments[gutil.env.prod ? 'production' : 'development'],
}
