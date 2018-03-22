const path = require('path');
const baseConfig = require('./webpack.config.js');


module.exports = Object.assign({}, baseConfig, {
  entry: [
    path.join(__dirname, './index.jsx')
  ],
  output: {
    filename: 'index.js',
    library: 'react-cosmos-docs-proxy',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '..', 'build') // where to place webpack files
  },

  plugins: [
    ...baseConfig.plugins
  ]
});
