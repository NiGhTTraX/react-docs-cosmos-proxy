import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './docs-table.less';

export default class Docs extends Component {
  static propTypes = {
    displayName: PropTypes.string.isRequired,
    description: PropTypes.string,

    /**
     * Needs to be react-docgen compatible data.
     */
    props: PropTypes.objectOf(PropTypes.shape({
      type: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired
    })),


    /**
     * Components that will render information about the props. Each of them
     * will receive the entire prop info object.
     */
    PropInfos: PropTypes.arrayOf(PropTypes.func).isRequired
  };

  static defaultProps = {
    description: '',
    props: undefined
  };

  render() {
    const { displayName, description, props } = this.props;

    return <div className="docs-table">
      <header>
        <h1 className="title">{displayName}</h1>
        {description && <h2 className="description">{description}</h2>}
      </header>
      {props && this.renderProps()}
    </div>;
  }

  renderProps() {
    const { props, PropInfos } = this.props;

    /* eslint-disable react/no-array-index-key */
    return <table className="props">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(props).map(prop => <tr key={prop} className="prop">
          {PropInfos.map((PropInfo, index) => <td key={index} className="prop-info">
            <PropInfo {...props[prop]} />
          </td>)}
        </tr>)}
      </tbody>
    </table>;
  }
}
