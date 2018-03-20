const path = require('path');


module.exports = {
  fileMatch: '**/{__fixture?(s)__,fixture?(s)}/**/*.{js,jsx}',
  webpackConfigPath: path.join(__dirname, '../src/webpack.config.dev.js'),
  hostname: '0.0.0.0'
};
