const webpack = require('webpack');

module.exports = {
  entry: './reactApp/app.js',
  output: {
    path: __dirname + '/build',
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015']
          }
        }
      },
      { test: /\.s?css$/, loader: 'style-loader!css-loader!sass-loader' }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
