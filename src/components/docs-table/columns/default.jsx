import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Default extends Component {
  static propTypes = {
    docs: PropTypes.shape({
      required: PropTypes.bool.isRequired
    }).isRequired
  };

  render() {
    const { docs } = this.props;
    const { required, defaultValue } = docs;

    return <span>{required ? 'Required' : defaultValue.value}</span>;
  }
}
