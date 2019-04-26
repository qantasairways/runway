const { createConfig, babel, postcss } = require('webpack-blocks');
const { version } = require('./package');

module.exports = {
  defaultExample: true,
  ribbon: {
    url: 'https://github.com/styleguidist/react-styleguidist'
  },
  ignore: ['**/components/*/*/*.js'],
  sections: [
    {
      name: 'Components',
      content: 'docs/Components.md',
      components: () => ['./src/components/*/*.js'],
      exampleMode: 'expand',
      usageMode: 'expand',
      sectionDepth: 0
    },
    {
      name: 'Icons',
      content: 'docs/Components.md',
      components: () => ['./src/icons/*/*.js'],
      exampleMode: 'expand',
      usageMode: 'hide',
      sectionDepth: 0
    }
  ],
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href:
            'http://www.qantas.com/etc/designs/qcom/site/main.min.6d306e1d045f4c8fdfaacc1cf7984b23.css'
        }
      ]
    }
  },
  theme: {
    fontFamily: {
      base: '"Ciutadella",Helvetica,Arial,sans-serif'
    }
  },
  version,
  webpackConfig: createConfig([babel(), postcss()])
};
