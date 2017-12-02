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
     * Components that will render information about the props.
     */
    Columns: PropTypes.arrayOf(PropTypes.shape({
      header: PropTypes.node.isRequired,

      /**
       * Will receive the `name` of the prop and its `docs`.
       */
      component: PropTypes.func.isRequired
    })).isRequired
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
    const { props, Columns } = this.props;

    return <table className="props">
      <thead>
        <tr>
          {Columns.map(({ header }) => <th key={header} className="prop-header">
            {header}
          </th>)}
        </tr>
      </thead>
      <tbody>
        {Object.keys(props).map(prop => <tr key={prop} className="prop">
          {Columns.map(({ header, component: PropInfo }) => <td key={header}
            className="prop-info"
          >
            <PropInfo {...props[prop]} />
          </td>)}
        </tr>)}
      </tbody>
    </table>;
  }
}
