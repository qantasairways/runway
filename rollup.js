/**
 * Components
 */
const path = require('path');
const {
  lstatSync,
  readdirSync,
  writeFile,
  createWriteStream
} = require('fs');

const COMPONENT_DIR = './src/components';
const ICON_DIR = './src/icons';
const THEME_DIR = './src/theme';

const isDirectory = source => lstatSync(source).isDirectory();
const getComponents = source =>
  readdirSync(source)
    .map(name => path.join(source, name))
    .filter(isDirectory);

const components = [
  ...getComponents(COMPONENT_DIR),
  ...getComponents(ICON_DIR),
  ...getComponents(THEME_DIR)
];

const themes = [...getComponents(THEME_DIR)];

/**
 * Rollup
 */
const babel = require('rollup-plugin-babel');
const json = require('rollup-plugin-json');
const rollup = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const visualizer = require('rollup-plugin-visualizer');

const OUTPUT_JS_TYPE = 'esm';
const OUTPUT_DIR = './lib';

/**
 * CLI
 */
const chalk = require('chalk');

console.log(
  chalk.red.bgWhite(
    `🦄 🌈  Compiling Qantas Runway Components into optimized modules`
  ),
  '\n'
);

/**
 * Build
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

function writeComponentToIndex(names) {
  const file = path.resolve(__dirname, `${OUTPUT_DIR}/index.js`);
  writeFile(file, '', () => {
    const wstream = createWriteStream(file);
    names.forEach(name =>
      wstream.write(`export { default as ${name} } from './${name}';\n`)
    );
    wstream.end();
  });
}

const isThemeDir = moduleDir => /theme/gi.test(moduleDir);

async function build(entrySrc, name, type, moduleDir) {
  try {
    const bundle = await rollup.rollup(inputOptions(entrySrc, type));
    await bundle.write(outputOptions(name, type));
    console.log(chalk.green(` ✅  Successuly packaged ${name} 📦`));
  } catch (error) {
    console.log(chalk.red(` ☠️  Failed to package ${name}`), error);
  }
}

const flattenName = ({ moduleName, moduleDir }) =>
  isThemeDir(moduleDir) ? `theme/${moduleName}` : moduleName;

async function generateModules() {
  const moduleNames = [];
  for (let index = 0; index < components.length; index++) {
    const dirs = components[index].split('/');
    // eslint-disable-next-line no-unused-vars
    const [moduleRoot, moduleDir, moduleName] = dirs;
    const name = flattenName({ moduleDir, moduleName });
    if (!isThemeDir(moduleDir)) {
      moduleNames.push(name);
    }
    console.log(
      chalk.cyan(` ⚙️  Now building: ${name}`),
      chalk.cyan(` 🗜  Module type: ${OUTPUT_JS_TYPE}`)
    );
    await build(components[index], name, OUTPUT_JS_TYPE, moduleDir);
  }
  writeComponentToIndex(moduleNames);
}

generateModules();
