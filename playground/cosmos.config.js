import path from 'path';


module.exports = {
  componentPaths: [
    path.join(__dirname, '../src/components'),
    path.join(__dirname, 'components')
  ],

  fixturePaths: [
    path.join(__dirname, 'fixtures')
  ],

  webpackConfigPath: path.join(__dirname, '../src/webpack.config.dev.js'),
  hostname: '0.0.0.0'
};
