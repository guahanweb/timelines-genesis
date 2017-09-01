'use strict';

const config = require('./config');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: path.join(config.path.client, 'index.jsx')
  },

  output: {
    path: path.join(config.path.dist, 'js'),
    filename: '[name].js'
  },

  devtool: 'source-map',

  resolve: {
    modules: ['client/lib', 'node_modules'],
    extensions: ['.jsx', '.js']
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader'
    }]
  }
};
