const {
  override,
  fixBabelImports,
  addLessLoader,
  addBundleVisualizer,
} = require('customize-cra');
const colors = require('./src/utils/colors');

const antdOptions = {
  libraryDirectory: 'es',
  style: true,
};

const loaderOptions = {
  javascriptEnabled: true,
  modifyVars: {
    '@primary-color': colors.primaryRed,
    '@link-color': colors.primaryOrange,
    '@btn-default-bg': colors.primaryOrange,
  },
};

const bundleOptions = {
  analyzerMode: 'static',
  reportFilename: 'report.html',
};

module.exports = override(
  fixBabelImports('antd', antdOptions),
  addLessLoader(loaderOptions),
  addBundleVisualizer(bundleOptions, true),
);
