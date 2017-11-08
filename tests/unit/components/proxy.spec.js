import React from 'react';
import { stub } from 'sinon';
import createDocsProxy from '../../../src/index.jsx';
import { render } from '../helpers/rendering.js';
import { createSpy } from '../helpers/chai-react.js';


describe('DocsProxy', () => {
  let NextProxy, Component, Docs, DocsProxy, next, props;

  beforeEach('common setup', () => {
    NextProxy = createSpy({ name: 'NextProxy' });

    next = stub().returns('next proxy');

    Component = createSpy({ name: 'Component' });

    props = {
      nextProxy: {
        value: NextProxy,
        next
      },
      component: Component
    };

    Docs = createSpy({ name: 'Docs' });

    DocsProxy = createDocsProxy({
      docsProperty: '__docs',
      Docs
    });
  });

  describe('with docs', () => {
    const docs = {
      foo: 'bar'
    };

    beforeEach(() => {
      Component.__docs = docs;

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

  describe('with no docs', () => {
    beforeEach(() => {
      render(<DocsProxy {...props} />);
    });

    it('should not render the docs', () => {
      expect(Docs).to.not.have.been.rendered;
    });
  });
});
