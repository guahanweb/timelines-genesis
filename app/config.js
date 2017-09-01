'use strict';

const path = require('path');
const pjson = require('./package');

module.exports = {
  pjson: pjson,
  env: getEnvironment(),
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',

  path: {
    server: path.resolve(__dirname, 'server'),
    dist: path.resolve(__dirname, 'dist'),
    client: path.resolve(__dirname, 'client'),
    template: path.resolve(__dirname, 'server/templates')
  },

  log: {
    filename: path.resolve(__dirname, 'logs/' + pjson.name + '.log'),
    level: getLogLevel()
  }
};

function getEnvironment() {
  let env = process.env.NODE_ENV || 'development';
  switch (env.toLowerCase()) {
    case 'prod':
    case 'production':
      return 'production';
    case 'local':
    case 'dev':
    case 'development':
      return 'development';
    default:
      throw `Unsupported environment specified: [${env}]`;
  }
}

function getLogLevel() {
  let level = process.env.LOG_LEVEL || null;
  if (!level) {
    switch (getEnvironment()) {
      case 'production':
        level = 'warn';
        break;
      default:
        level = 'debug';
    }
  }
  return level;
}
