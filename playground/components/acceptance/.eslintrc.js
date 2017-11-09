module.exports = {
  extends: '../../../.eslintrc.js',

  rules: {
    // These components are meant for checking the react-docgen integration so
    // they define a lot of prop types but don't actually use the props.
    'react/no-unused-prop-types': 0
  }
};
