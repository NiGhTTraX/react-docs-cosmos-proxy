import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TODO: this smells like a SRP violation.
const _renderPrimitive = name => <span>{name}</span>;

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

    // TODO: this smells like an O/C violation.
    switch (name) {
      case 'shape':
        return this._renderShape(value);
      default:
        return _renderPrimitive(name);
    }
  }

  _renderShape(value) {
    const keys = Object.keys(value);

    return <ul className="shape">
      {keys.map(key => <li className="shape-key" key={key}>
        {key}: {this._render(value[key])}
      </li>)}
    </ul>;
  }
}
