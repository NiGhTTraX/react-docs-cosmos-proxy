import { mugshotSuite, loadFixture } from 'tests/acceptance/helpers.js';

mugshotSuite('Test', it => {
  it('should work', async () => {
    await loadFixture('acceptance/one-prop', 'base');
  });
});
