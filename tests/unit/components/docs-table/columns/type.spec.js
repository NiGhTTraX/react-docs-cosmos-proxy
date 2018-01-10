import React from 'react';
import Type from 'src/components/docs-table/columns/type.jsx';
import { $render } from 'tests/unit/helpers/rendering.js';


describe('Type column', () => {
  let $type;

  describe('primitive', () => {
    beforeEach(() => {
      $type = $render(<Type docs={{ type: { name: 'string' } }} />);
    });

    it('should render the primitive type\'s name', () => {
      expect($type.text()).to.equal('string');
    });
  });

  describe('shape', () => {
    describe('primitive', () => {
      beforeEach(() => {
        const docs = {
          type: {
            name: 'shape',
            value: {
              foo: { name: 'bool' },
              bar: { name: 'number' }
            }
          }
        };

        $type = $render(<Type docs={docs} />);
      });

      it('should render the keys', () => {
        expect($type.text()).to.include('foo').and.to.include('bar');
      });

      it('should render the types of the keys', () => {
        expect($type.text()).to.include('bool').and.to.include('number');
      });
    });

    describe('complex', () => {
      beforeEach(() => {
        const docs = {
          type: {
            name: 'shape',
            value: {
              foo: {
                name: 'shape',
                value: {
                  bar: {
                    name: 'bool'
                  }
                }
              }
            }
          }
        };

        $type = $render(<Type docs={docs} />);
      });

      it('should render complex value types', () => {
        expect($type.text()).to.include('bar').and.to.include('bool');
      });
    });
  });
});
