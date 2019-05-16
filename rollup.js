const path = require('path');
const { lstatSync, readdirSync, appendFileSync } = require('fs');
const ncp = require('ncp').ncp;
const chalk = require('chalk');
const babel = require('rollup-plugin-babel');
const json = require('rollup-plugin-json');
const rollup = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const visualizer = require('rollup-plugin-visualizer');

const COMPONENT_DIR = './src/components';
const ICON_DIR = './src/icons';
const THEME_DIR = './src/theme';
const OUTPUT_JS_TYPE = 'esm';
const OUTPUT_DIR = './lib';

console.log(
  chalk.red.bgWhite(
    `🦄 🌈  Compiling Qantas Runway Components into optimized modules`
  ),
  '\n'
);

/**
 * Components
 */
const getComponents = source =>
  readdirSync(source)
    .map(name => path.join(source, name))
    .filter(source => lstatSync(source).isDirectory());

const components = [
  ...getComponents(COMPONENT_DIR),
  ...getComponents(ICON_DIR)
];

const themes = [...getComponents(THEME_DIR)];

/**
 * Build Modules
 */
const externals = ['react', 'react-dom', 'prop-types', 'emotion'];
const makeExternalPredicate = externalsArr => {
  if (externalsArr.length === 0) {
    return () => false;
  }
  const externalPattern = new RegExp(`^(${externalsArr.join('|')})($|/)`);
  return id => externalPattern.test(id);
};

const inputOptions = entry => ({
  input: `${entry}/index.js`,
  external: makeExternalPredicate(externals),
  plugins: [
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    nodeResolve({
      browser: true
    }),
    json({
      exclude: 'node_modules/**'
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'react-is': ['isForwardRef', 'isValidElementType'],
        shortid: ['generate'],
        'react-day-picker': ['DayPicker'],
        'highlight-words-core': ['findAll'],
        'body-scroll-lock': [
          'disableBodyScroll',
          'enableBodyScroll',
          'clearAllBodyScrollLocks'
        ]
      }
    }),
    visualizer()
  ]
});

const outputOptions = (name, type) => {
  const folderName = name.replace(/(src\\\\components|src\\\\icons)/g, ''); // windows hotfix
  return {
    file: path.resolve(__dirname, `${OUTPUT_DIR}/${folderName}/index.js`),
    name: folderName,
    format: type
  };
};

function writeComponentToIndex(name) {
  const file = path.resolve(__dirname, `${OUTPUT_DIR}/index.js`);
  const data = `export { default as ${name} } from './${name}';\n`;
  return appendFileSync(file, data);
}

async function build(entrySrc, name, type) {
  try {
    const bundle = await rollup.rollup(inputOptions(entrySrc, type));

    await bundle.write(outputOptions(name, type));
    writeComponentToIndex(name);
    console.log(chalk.green(` ✅  Successuly packaged ${name} 📦`));
  } catch (error) {
    console.log(chalk.red(` ☠️  Failed to package ${name}`), error);
  }
}

async function generateModules() {
  for (let index = 0; index < components.length; index++) {
    const name = components[index].split('/').pop();
    console.log(
      chalk.cyan(` ⚙️  Now building: ${name}`),
      chalk.cyan(` 🗜  Module type: ${OUTPUT_JS_TYPE}`)
    );
    await build(
      components[index],
      components[index].split('/').pop(),
      OUTPUT_JS_TYPE
    );
  }
}

/**
 * Copy Themes
 */
const jsonExtRegExp = /^[A-Za-z0-9\-\/]*(\.json)/;

const filterFunc = src => {
  if (lstatSync(src).isDirectory()) {
    return true;
  }
  return jsonExtRegExp.test(src);
};

function copyThemes() {
  ncp(
    path.resolve(__dirname, THEME_DIR),
    path.resolve(__dirname, `${OUTPUT_DIR}/theme`),
    { filter: filterFunc },
    function(error) {
      if (error) {
        console.log(chalk.red(` ☠️  Failed to copy theme files`), error);
      }
    }
  );
}

generateModules();
copyThemes();
