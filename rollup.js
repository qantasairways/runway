/**
 * Components
 */
const path = require('path');
const { lstatSync, readdirSync } = require('fs');

const COMPONENT_DIR = './src/components';

const isDirectory = source => lstatSync(source).isDirectory();
const getComponents = source =>
  readdirSync(source)
    .map(name => path.join(source, name))
    .filter(isDirectory);

const components = getComponents(COMPONENT_DIR);

/**
 * Rollup
 */
const babel = require('rollup-plugin-babel');
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
    nodeResolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'react-is': ['isForwardRef', 'isValidElementType']
      }
    }),
    visualizer()
  ]
});

const outputOptions = (name, type) => {
  const folderName = name.replace('src\\components', ''); // windows hotfix
  return {
    file: path.resolve(__dirname, `${OUTPUT_DIR}/${folderName}/index.js`),
    name: folderName,
    format: type
  };
};

async function build(entrySrc, name, type) {
  try {
    const bundle = await rollup.rollup(inputOptions(entrySrc, type));
    await bundle.write(outputOptions(name, type));
    console.log(chalk.green(` ✅  Successuly packaged ${name} 📦`));
  } catch (error) {
    console.log(chalk.red(` ☠️  Failed to package ${name}`), error);
  }
}

async function generateModules() {
  for (let index = 0; index < components.length; index++) {
    const name = components[index].split('/').pop();
    console.log(chalk.cyan(` ⚙️  Now building: ${name}`));
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

generateModules();
