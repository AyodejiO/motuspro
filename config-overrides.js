/*jshint esversion: 9 */
const path = require('path');
const {override,  addLessLoader} = require('customize-cra');
const overrideProcessEnv = value => config => {
  config.module.rules[0].parser.requireEnsure = true
  config.resolve.modules = [
    path.join(__dirname, 'src')
  ].concat(config.resolve.modules);
  return config;
};

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      // '@primary-color': '#1c1c1c',
      '@primary-color': '#038fdd',
    }
  }),
  overrideProcessEnv({
    VERSION: JSON.stringify(require('./package.json').version),
  })
);
