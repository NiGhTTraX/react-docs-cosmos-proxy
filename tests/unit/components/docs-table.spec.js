import React from 'react';
import DocsTable from 'src/components/docs-table.jsx';
import { $render } from 'tests/unit/helpers/rendering.js';
import { createSpy } from 'tests/unit/helpers/chai-react.js';

describe('DocsTable', () => {
  let $docsTable, PropInfos;

  describe('with props', () => {
    const props = {
      foo: { type: { name: 'string' } },
      bar: { type: { name: 'number' } }
    };

    beforeEach(() => {
      PropInfos = [
        createSpy({ name: 'PropInfo1' }),
        createSpy({ name: 'PropInfo2' })
      ];

      $docsTable = $render(<DocsTable
        displayName="Display name"
        description="Lorem ipsum"
        props={props}
        PropInfos={PropInfos}
      />);
    });

    it('should render the name of the component', () => {
      expect($docsTable.find('.title').text()).to.equal('Display name');
    });

    it('should render the component\'s description', () => {
      expect($docsTable.find('.description').text()).to.equal('Lorem ipsum');
    });

    it('should render a row for each prop', () => {
      expect($docsTable.find('.prop')).to.have.length(2);
    });

    it('should render all the prop info', () => {
      expect($docsTable.find('.prop-info')).to.have.length(2 * 2);

      Object.keys(props).forEach(prop => {
        PropInfos.forEach(propInfo => {
          expect(propInfo).to.have.been.renderedWith(props[prop]);
        });
      });
    });
  });

  describe('with no props', () => {
    beforeEach(() => {
      $docsTable = $render(<DocsTable
        displayName="Display name"
        description="Lorem ipsum"
        PropInfos={[]}
      />);
    });

    it('should not render the table', () => {
      expect($docsTable.find('.props')).to.have.length(0);
    });
  });

  describe('with no description', () => {
    beforeEach(() => {
      $docsTable = $render(<DocsTable
        displayName="Display name"
        PropInfos={[]}
      />);
    });

    it('should not render the description', () => {
      expect($docsTable.find('.description')).to.have.length(0);
    });
  });
});
