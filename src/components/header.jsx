import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './header.less';


export default class Header extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    const { children } = this.props;

    return <div className="header">
      <div className="content">
        {children}
      </div>
      <div className="toggle">
        <svg viewBox="0 0 1792 1792">
          <path d="M1395 864q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23zm0-384q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z" fill="currentColor" />
        </svg>
      </div>
    </div>;
  }
}
