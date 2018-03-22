const { HotModuleReplacementPlugin, NoEmitOnErrorsPlugin } = require('webpack');

const { env: { NODE_ENV } } = process;

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },

  devtool: 'sourcemap',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.less/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          NODE_ENV === 'production'
            ? 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
            // Keep the classnames the same inside our development environment
            : 'css-loader?modules&importLoaders=1&localIdentName=[local]',
          'less-loader'
        ]
      }
    ]
  },

  plugins: [new HotModuleReplacementPlugin(), new NoEmitOnErrorsPlugin()]
};
