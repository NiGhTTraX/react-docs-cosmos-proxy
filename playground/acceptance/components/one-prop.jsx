import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class OneProp extends Component {
  static propTypes = {
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
