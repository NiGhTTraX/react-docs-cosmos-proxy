module.exports = {
  componentPaths: [
    '../src/components',
    './acceptance/components'
  ],

  fixturePaths: [
    './fixtures',
    './acceptance/fixtures'
  ],

  webpackConfigPath: '../src/webpack.config.dev.js',
  hostname: '0.0.0.0'
};
