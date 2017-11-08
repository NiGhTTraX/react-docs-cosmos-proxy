import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import Header from 'src/components/header.jsx';
import { $render } from 'tests/unit/helpers/rendering.js';


describe('Header', () => {
  let $header;

  beforeEach(() => {
    $header = $render(<Header><span>foobar</span></Header>);
  });

  it('should render its children', () => {
    expect($header.text()).to.equal('foobar');
  });

  it('should initially hide the content', () => {
    expect($header.find('.content').hasClass('hidden')).to.be.true;
  });

  it('should show the content when toggling', () => {
    Simulate.click($header.find('.toggle')[0]);

    expect($header.find('.content').hasClass('hidden')).to.be.false;
  });
});

