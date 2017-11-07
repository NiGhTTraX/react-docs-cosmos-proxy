module.exports = {
  extends: '../../../.eslintrc.js',

  rules: {
    // The components in here are only for testing props and they define a lot
    // of prop types without actually using the props.
    'react/no-unused-prop-types': 0
  }
};
