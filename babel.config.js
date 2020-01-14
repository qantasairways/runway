const productionPlugins = [
  'babel-plugin-transform-react-constant-elements',
  'babel-plugin-transform-dev-warning',
  ['babel-plugin-react-remove-properties', { properties: ['data-test-id'] }],
  [
    'babel-plugin-transform-react-remove-prop-types',
    {
      mode: 'unsafe-wrap'
    }
  ]
];

module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@emotion/babel-preset-css-prop'
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-object-assign',
    'emotion',
    '@babel/plugin-syntax-async-generators',
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-transform-regenerator'
  ],
  env: {
    cjs: {
      plugins: productionPlugins
    },
    esm: {
      plugins: [
        ...productionPlugins,
        ['@babel/plugin-transform-runtime', { useESModules: true }]
      ]
    },
    es: {
      plugins: [
        ...productionPlugins,
        ['@babel/plugin-transform-runtime', { useESModules: true }]
      ]
    },
    production: {
      plugins: [
        ...productionPlugins,
        ['@babel/plugin-transform-runtime', { useESModules: true }]
      ]
    },
    'production-umd': {
      plugins: [
        ...productionPlugins,
        ['@babel/plugin-transform-runtime', { useESModules: true }]
      ]
    },
    test: {
      sourceMaps: 'both',
      plugins: [
        [
          'emotion',
          {
            sourceMap: false
          }
        ]
      ]
    }
  }
};
