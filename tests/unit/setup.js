const hook = require('css-modules-require-hook');
const lessParser = require('postcss-less').parse;

hook({
  extensions: '.less',
  processorOpts: { parser: lessParser },
  generateScopedName: '[local]'
});
