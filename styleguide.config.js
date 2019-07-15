const { createConfig, babel, postcss } = require('webpack-blocks');
const { version } = require('./package');

module.exports = {
  defaultExample: true,
  ribbon: {
    url: 'https://github.com/styleguidist/react-styleguidist'
  },
  ignore: ['**/components/*/*/*.js'],
  pagePerSection: true,
  sections: [
    {
      name: 'Documentation',
      sections: [
        {
          name: 'Change Log',
          content: 'CHANGELOG.md',
          sectionDepth: 0
        }
      ]
    },
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
  theme: {
    baseBackground: '#fdfdfc',
    link: '#274e75',
    linkHover: '#90a7bf',
    border: '#e0d2de',
    font: ['Helvetica', 'sans-serif']
  },
  styles: {
    Playground: {
      preview: {
        paddingLeft: 0,
        paddingRight: 0,
        borderWidth: [[0, 0, 1, 0]],
        borderRadius: 0
      }
    },
    Markdown: {
      pre: {
        border: 0,
        background: 'none'
      },
      code: {
        fontSize: 14
      }
    }
  },

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
