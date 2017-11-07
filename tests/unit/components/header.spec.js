import React from 'react';
import Header from '../../../src/components/header.jsx';
import { $render } from '../helpers/rendering.js';


describe('Header', () => {
  let $header;

  beforeEach(() => {
    $header = $render(<Header><span>foobar</span></Header>);
  });

  it('should render its children', () => {
    expect($header.text()).to.equal('foobar');
  });
});

