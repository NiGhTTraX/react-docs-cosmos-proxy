import { mugshotSuite, loadFixture } from '../helpers.js';

mugshotSuite('Test', it => {
  it('should work', async () => {
    await loadFixture('one-prop', 'base');
  });
});
