import React from 'react';
import { stub } from 'sinon';
import createDocsProxy from '../../../src/index.jsx';
import { render } from '../helpers/rendering.js';
import { createSpy } from '../helpers/chai-react.js';


describe('DocsProxy', () => {
  const docs = {
    foo: 'bar'
  };

  let NextProxy, Component, Docs, next, props;

  beforeEach(() => {
    NextProxy = createSpy({ name: 'NextProxy' });

    Component = createSpy({ name: 'Component' });
    Component.__docs = docs;

    Docs = createSpy({ name: 'Docs' });

    next = stub().returns('next proxy');

    props = {
      nextProxy: {
        value: NextProxy,
        next
      },
      component: Component
    };

    const DocsProxy = createDocsProxy({
      docsProperty: '__docs',
      Docs
    });

    render(<DocsProxy {...props} />);
  });

  it('should render the next proxy', () => {
    expect(NextProxy).to.have.been.renderedWith({
      ...props,
      nextProxy: 'next proxy'
    });
  });

  it('should render the docs', () => {
    expect(Docs).to.have.been.renderedWith(docs);
  });
});
