import React, { Component } from 'react';
import PropTypes from 'prop-types';


/**
 * A simple component with one prop.
 */
export default class OneProp extends Component {
  static propTypes = {
    /**
     * How much wood would a wood-chuck chuck if a wood-chuck could Chuck
     * Norris?
     */
    foo: PropTypes.string
  };

  static defaultProps = {
    foo: 'bar'
  };

  render() {
    return <div>
      I have a single prop
    </div>;
  }
}
