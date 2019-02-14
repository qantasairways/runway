const path = require('path');
const { version } = require('./package');

module.exports = {
  defaultExample: true,
  ribbon: {
    url: 'https://github.com/styleguidist/react-styleguidist'
  },
  version,
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    }
  }
};
