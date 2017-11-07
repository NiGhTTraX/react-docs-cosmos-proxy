import React, { Component } from 'react';
import { proxyPropTypes } from 'react-cosmos-utils/lib/proxy-prop-types';
import DocsTable from './components/docs-table.jsx';


/**
 * @param {ReactComponent} Docs A component responsible for rendering the
 *     documentation.
 * @param {String} docsProperty The name of the property on the component
 *     that holds the documentation.
 */
export default ({
  Docs = DocsTable,
  docsProperty = '__docgenInfo'
} = {}) => class DocsProxy extends Component {
  static propTypes = proxyPropTypes;

  render() {
    const { value: NextProxy, next } = this.props.nextProxy;
    const { [docsProperty]: docs } = this.props.component;

    return <div className="docs-proxy">
      <div className="docs-panel">
        <Docs {...docs} />
      </div>
      <div className="component-panel">
        <NextProxy {...this.props} nextProxy={next()} />
      </div>
    </div>;
  }
};
