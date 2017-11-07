import React, { Component } from 'react';
import PropTypes from 'prop-types';


// TODO: move these out of src/
/* eslint-disable */
export default class OneProp extends Component {
  static propTypes = {
    foo: PropTypes.string
  };

  render() {
    return <div>
      I have a single prop
    </div>;
  }
}
