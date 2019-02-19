const path = require('path');
const { createConfig, babel, postcss } = require('webpack-blocks');
const { version } = require('./package');

module.exports = {
  defaultExample: true,
  ribbon: {
    url: 'https://github.com/styleguidist/react-styleguidist'
  },
  version,
  webpackConfig: createConfig([babel(), postcss()])
};
