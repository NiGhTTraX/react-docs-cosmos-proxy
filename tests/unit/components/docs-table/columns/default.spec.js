import React from 'react';
import Default from 'src/components/docs-table/columns/default.jsx';
import { $render } from 'tests/unit/helpers/rendering.js';


describe('Default column', () => {
  it('should not show anything if there is no default value', () => {
    const $default = $render(<Default docs={{ required: false }} />);
    expect($default.text()).to.be.empty;
  });
});
