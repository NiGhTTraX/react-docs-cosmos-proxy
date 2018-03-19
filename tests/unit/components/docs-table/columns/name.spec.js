import React from 'react';
import Name from 'src/components/docs-table/columns/name.jsx';
import { $render } from 'tests/unit/helpers/rendering.js';


describe('Name column', () => {
  it('should render the props name', () => {
    const $name = $render(<Name name="nameValue" />);
    expect($name.text()).to.equal('nameValue');
  });
});
