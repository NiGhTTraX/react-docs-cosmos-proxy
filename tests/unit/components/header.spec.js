import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { spy, stub } from 'sinon';
import Header from 'src/components/header.jsx';
import { $render } from 'tests/unit/helpers/rendering.js';


describe('Header', () => {
  let cache, $header;

  beforeEach(() => {
    cache = {
      get: stub(),
      set: spy()
    };
  });

  describe('cold cache', () => {
    beforeEach(() => {
      cache.get.withArgs('hidden').returns(null);

      $header = $render(<Header cache={cache}><span>foobar</span></Header>);
    });

    it('should render its children', () => {
      expect($header.text()).to.equal('foobar');
    });

    it('should initially show the content', () => {
      expect($header.find('.content').hasClass('hidden')).to.be.false;
    });

    it('should hide the content when toggling', () => {
      Simulate.click($header.find('.toggle')[0]);

      expect($header.find('.content').hasClass('hidden')).to.be.true;
    });

    it('should cache the toggle state', () => {
      Simulate.click($header.find('.toggle')[0]);

      expect(cache.set).to.have.been.calledWith('hidden', true);
    });
  });

  describe('warm cache', () => {
    beforeEach(() => {
      cache.get.withArgs('hidden').returns(true);

      $header = $render(<Header cache={cache}><span>foobar</span></Header>);
    });

    it('should initially hide the content', () => {
      expect($header.find('.content').hasClass('hidden')).to.be.true;
    });

    it('should cache the toggle state', () => {
      Simulate.click($header.find('.toggle')[0]);

      expect(cache.set).to.have.been.calledWith('hidden', false);
    });
  });
});
