import React from 'react';
import $ from 'jquery';
import DocsTable from 'src/components/docs-table/docs-table.jsx';
import { $render } from 'tests/unit/helpers/rendering.js';
import { createSpy } from 'tests/unit/helpers/chai-react.js';
import { sel } from 'tests/unit/helpers/selectors.js';

describe('DocsTable', () => {
  let $docsTable, Columns;

  describe('with props', () => {
    const props = {
      foo: { type: { name: 'string' } },
      bar: { type: { name: 'number' } }
    };

    beforeEach(() => {
      Columns = [
        { header: 'Header 1', component: createSpy({ name: 'PropInfo1' }) },
        { header: 'Header 2', component: createSpy({ name: 'PropInfo2' }) }
      ];

      $docsTable = $render(<DocsTable
        displayName="Display name"
        description="Lorem ipsum"
        props={props}
        Columns={Columns}
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

    it('should render all the header columns', () => {
      expect($docsTable.find('.prop-header').map(function() {
        return $(this).text();
      }).get()).to.deep.equal([
        'Header 1',
        'Header 2'
      ]);
    });

    it('should render all the prop info', () => {
      expect($docsTable.find(sel('prop-info'))).to.have.length(2 * 2);

      Object.keys(props).forEach(prop => {
        Columns.forEach(({ component }) => {
          expect(component).to.have.been.renderedWith({
            name: prop,
            docs: props[prop]
          });
        });
      });
    });
  });

  describe('with no props', () => {
    beforeEach(() => {
      $docsTable = $render(<DocsTable
        displayName="Display name"
        description="Lorem ipsum"
        Columns={[]}
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
        Columns={[]}
      />);
    });

    it('should not render the description', () => {
      expect($docsTable.find('.description')).to.have.length(0);
    });
  });
});
