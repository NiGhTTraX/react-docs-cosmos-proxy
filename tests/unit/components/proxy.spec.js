import React from 'react';
import { stub } from 'sinon';
import createDocsProxy from '../../../src/index.jsx';
import { render } from '../helpers/rendering.js';
import { createSpy } from '../helpers/chai-react.js';


describe('DocsProxy', () => {
  let NextProxy, Component, next, props;

  beforeEach(() => {
    const DocsProxy = createDocsProxy();

    NextProxy = createSpy({ name: 'NextProxy' });

    Component = createSpy({ name: 'Component' });
    Component.__docgenInfo = {
      foo: 'bar'
    };

    next = stub().returns('next proxy');

    props = {
      nextProxy: {
        value: NextProxy,
        next
      },
      component: Component
    };

    render(<DocsProxy {...props} />);
  });

  it('should render the next proxy', () => {
    expect(NextProxy).to.have.been.renderedWith({
      ...props,
      nextProxy: 'next proxy'
    });
  });
});
