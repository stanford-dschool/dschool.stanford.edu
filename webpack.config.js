const path = require('path')

module.exports = {
  entry: './app/scripts/index.js',
  output: {
    path: path.join(__dirname, 'template/scripts'),
    filename: 'index.js',
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
}
