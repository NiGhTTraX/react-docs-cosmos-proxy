import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Name extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  render() {
    const { name } = this.props;

    return <span>{name}</span>;
  }
}
