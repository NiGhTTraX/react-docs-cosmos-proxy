import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Type extends Component {
  static propTypes = {
    docs: PropTypes.shape({
      type: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  render() {
    const { type } = this.props.docs;
    const { name } = type;

    return <span>{name}</span>;
  }
}
