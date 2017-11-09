const baseConfig = require('./karma.config.js');


module.exports = config => {
  baseConfig(config);

  config.set({
    // We'll manually connect our own browser.
    browsers: [],
    customLaunchers: null,

    // We don't want to exit after the first run.
    singleRun: false,

    client: {
      mocha: {
        timeout: 0
      }
    }
  });
};
