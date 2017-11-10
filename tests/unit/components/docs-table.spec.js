import React from 'react';
import $ from 'jquery';
import DocsTable from 'src/components/docs-table.jsx';
import { $render } from 'tests/unit/helpers/rendering.js';

describe('DocsTable', () => {
  const props = {
    foo: { type: { name: 'string' } },
    bar: { type: { name: 'number' } }
  };

  let $docsTable;

  beforeEach(() => {
    $docsTable = $render(<DocsTable
      displayName="Display name"
      description="Lorem ipsum"
      props={props}
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

  it('should render the prop names', () => {
    expect($docsTable.find('.prop .name').map(function() {
      return $(this).text();
    }).get()).to.deep.equal(['foo', 'bar']);
  });

  it('should render the prop types', () => {
    expect($docsTable.find('.prop .type').map(function() {
      return $(this).text();
    }).get()).to.deep.equal(['string', 'number']);
  });
});
