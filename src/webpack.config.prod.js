const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.less/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }]
  },
  plugins: [
    ...baseConfig.plugins,
    new HtmlWebpackPlugin()
  ]
});
