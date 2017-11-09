const webpackConfig = require('../../src/webpack.config.js');

const webdriverConfig = {
  hostname: 'selenium',
  port: 4444
};


module.exports = config => {
  config.set({
    basePath: '',

    hostname: 'karma',
    port: 9876,
    listenAddress: '0.0.0.0',

    // We only need mocha here. chai and sinon/sinon-chai are required in the
    // test files.
    frameworks: ['mocha'],

    files: [
      './setup.js',
      './**/*.spec.js'
    ],

    preprocessors: {
      './setup.js': ['webpack', 'sourcemap'],
      './**/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack: Object.assign({}, webpackConfig, {
      // External sourcemaps are not supported.
      devtool: 'inline-sourcemap',

      // Exit on compilation errors.
      bail: true
    }),

    webpackMiddleware: {
      // Hide compilation stats.
      stats: 'errors-only'
    },

    reporters: [
      'progress',
      'coverage'
    ],

    coverageReporter: {
      type: 'json',
      dir: 'results/coverage/',
      subdir: browser => browser.toLowerCase().split(/[ /-]/)[0]
    },

    browsers: [
      'Chrome',
      'Firefox'
    ],

    customLaunchers: {
      Chrome: {
        base: 'WebDriver',
        config: webdriverConfig,
        browserName: 'chrome',
        name: 'Karma',
        pseudoActivityInterval: 30 * 1000
      },

      Firefox: {
        base: 'WebDriver',
        config: webdriverConfig,
        browserName: 'firefox',
        name: 'Karma',
        pseudoActivityInterval: 30 * 1000
      }
    },

    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: false,
    singleRun: true
  });
};
