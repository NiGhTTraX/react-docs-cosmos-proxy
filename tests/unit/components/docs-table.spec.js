import React from 'react';
import DocsTable from '../../../src/components/docs-table.jsx';
import { $render } from '../helpers/rendering.js';

describe('Docs', () => {
  it('should work', () => {
    $render(<DocsTable />);
  });
});
