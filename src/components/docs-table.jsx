import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Docs extends Component {
  static propTypes = {
    displayName: PropTypes.string.isRequired,
    description: PropTypes.string
  };

  static defaultProps = {
    description: ''
  };

  render() {
    const { displayName, description } = this.props;

    return <div className="docs">
      <header>
        <h1 className="title">{displayName}</h1>
        <h2 className="description">{description}</h2>
      </header>
    </div>;
  }
}
