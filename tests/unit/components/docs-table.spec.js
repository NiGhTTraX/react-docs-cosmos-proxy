import React from 'react';
import DocsTable from 'src/components/docs-table.jsx';
import { $render } from 'tests/unit/helpers/rendering.js';

describe('Docs', () => {
  let $docs;

  beforeEach(() => {
    $docs = $render(<DocsTable displayName="Display name" />);
  });

  it('should render the name of the component', () => {
    expect($docs.find('.title').text()).to.equal('Display name');
  });
});
