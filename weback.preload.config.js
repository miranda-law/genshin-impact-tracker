const rules = require('./webpack.rules');

module.exports = {
  entry: './src/preload.js',
  module: {
    rules,
  },
};