import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Docs extends Component {
  static propTypes = {
    displayName: PropTypes.string.isRequired
  };

  render() {
    const { displayName } = this.props;

    return <div className="docs">
      <header>
        <h1 className="title">{displayName}</h1>
      </header>
    </div>;
  }
}
