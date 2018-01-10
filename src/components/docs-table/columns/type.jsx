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

    return this._render(type);
  }

  _render(type) {
    const { name, value } = type;

    if (name === 'shape') {
      const keys = Object.keys(value);

      return <ul className="shape">
        {keys.map(key => <li className="shape-key" key={key}>
          {key}: {this._render(value[key])}
        </li>)}
      </ul>;
    }

    return <span>{name}</span>;
  }
}
