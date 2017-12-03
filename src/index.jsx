import React, { Component } from 'react';
import { proxyPropTypes } from 'react-cosmos-utils/lib/proxy-prop-types';

import DocsTable from 'src/components/docs-table/docs-table.jsx';
import Name from 'src/components/docs-table/columns/name.jsx';
import Type from 'src/components/docs-table/columns/type.jsx';
import Default from 'src/components/docs-table/columns/default.jsx';

import Header from 'src/components/header.jsx';
import LocalStorage from 'src/lib/localstorage.js';

import './index.less';

const headerCache = new LocalStorage('docs_proxy_header');

const Columns = [{
  header: 'Name',
  component: Name
}, {
  header: 'Type',
  component: Type
}, {
  header: 'Default',
  component: Default
}];
const DefaultDocsTable = props => <DocsTable {...props} Columns={Columns} />;

/**
 * @param {ReactComponent} Docs A component responsible for rendering the
 *     documentation.
 * @param {String} docsProperty The name of the property on the component
 *     that holds the documentation.
 */
export default ({
  Docs = DefaultDocsTable,
  docsProperty = '__docgenInfo'
} = {}) => class DocsProxy extends Component {
  static propTypes = proxyPropTypes;

  render() {
    const { value: NextProxy, next } = this.props.nextProxy;
    const { [docsProperty]: docs } = this.props.component;

    return <div className="docs-proxy">
      {docs ? this.renderDocs() : null}
      <div className="component-panel">
        <NextProxy {...this.props} nextProxy={next()} />
      </div>
    </div>;
  }

  renderDocs() {
    // TODO: move this to a separate component
    const { [docsProperty]: docs } = this.props.component;

    return <div className="docs-panel">
      <Header cache={headerCache}>
        <Docs {...docs} />
      </Header>
    </div>;
  }
};
