import React from 'react';
import Docs from '../../../src/components/docs.jsx';
import { $render } from '../helpers/rendering.js';

describe('Docs', () => {
  it('should work', () => {
    $render(<Docs />);
  });
});
