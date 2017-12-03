import React from 'react';
import Type from 'src/components/docs-table/columns/type.jsx';
import { $render } from 'tests/unit/helpers/rendering.js';


describe('Type column', () => {
  it('should render the primitive type\'s name', () => {
    const $type = $render(<Type docs={{ type: { name: 'string' } }} />);
    expect($type.text()).to.equal('string');
  });
});
