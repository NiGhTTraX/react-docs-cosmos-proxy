import React from 'react';
import Default from 'src/components/docs-table/columns/default.jsx';
import { $render } from 'tests/unit/helpers/rendering.js';


describe('Default column', () => {
  it('should not show anything if there is no default value', () => {
    const $default = $render(<Default docs={{ required: false }} />);
    expect($default.text()).to.be.empty;
  });

  it('show required if set', () => {
    const $default = $render(<Default docs={{ required: true }} />);
    expect($default.text()).to.equal('Required');
  });

  it('show default value if set', () => {
    const $default = $render(<Default docs={{ required: false, defaultValue: { value: 'value' } }} />);
    expect($default.text()).to.equal('value');
  });
});
