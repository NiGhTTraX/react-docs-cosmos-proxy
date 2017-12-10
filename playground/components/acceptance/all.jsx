import React, { Component } from 'react';
import PropTypes from 'prop-types';


/**
 * All the documentation!
 */
export default class All extends Component {
  static propTypes = {
    /* A primitive type. */
    primitive: PropTypes.string,

    /* A required primitive type */
    primitiveRequired: PropTypes.number.isRequired
  };

  static defaultProps = {
    primitive: 'primitive'
  };

  render() {
    return <div>
      All the documentation!
    </div>;
  }
}
