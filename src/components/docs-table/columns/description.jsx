import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Description extends Component {
  static propTypes = {
    docs: PropTypes.shape({ description: PropTypes.string })
  };
  static defaultProps = {
    docs: { description: '' }
  }

  render() {
    const { docs: { description } } = this.props;
    return <span>{description}</span>;
  }
}
