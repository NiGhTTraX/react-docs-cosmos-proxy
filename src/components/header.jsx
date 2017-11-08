import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './header.less';


export default class Header extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    // TODO: import this from somewhere; maybe abstract-cache.js?
    cache: PropTypes.shape({
      get: PropTypes.func.isRequired,
      set: PropTypes.func.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);

    const { cache } = this.props;

    this.state = {
      hidden: !!cache.get('hidden')
    };
  }

  render() {
    const { children } = this.props;
    const { hidden } = this.state;

    return <div className="header">
      <div className={classNames('content', { hidden })}>
        {children}
      </div>
      <button className="toggle" onClick={this.onToggle}>
        {this.renderToggle()}
      </button>
    </div>;
  }

  renderToggle() {
    const { hidden } = this.state;
    let path;

    if (hidden) {
      path = 'M1395 864q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23zm0-384q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z';
    } else {
      path = 'M1395 1312q0 13-10 23l-50 50q-10 10-23 10t-23-10l-393-393-393 393q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l466 466q10 10 10 23zm0-384q0 13-10 23l-50 50q-10 10-23 10t-23-10l-393-393-393 393q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l466 466q10 10 10 23z';
    }

    return <svg viewBox="0 0 1792 1792">
      <path d={path} fill="currentColor" />
    </svg>;
  }

  onToggle = () => {
    const { cache } = this.props;

    this.setState({ hidden: !this.state.hidden }, () => {
      cache.set('hidden', this.state.hidden);
    });
  }
}
