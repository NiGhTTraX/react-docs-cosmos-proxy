import React, { Component } from 'react';
import { proxyPropTypes } from 'react-cosmos-utils/lib/proxy-prop-types';
import Docs from './components/docs.jsx';


export default () => class DocsProxy extends Component {
  static propTypes = proxyPropTypes;

  render() {
    const { value: NextProxy, next } = this.props.nextProxy;
    // TODO: have an option for the doc var name
    const { __docgenInfo: docs } = this.props.component;

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
