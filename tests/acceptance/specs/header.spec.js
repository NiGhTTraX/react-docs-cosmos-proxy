import { loadFixture } from 'tests/acceptance/helpers.js';

describe('Header', () => {
  beforeEach(async () => {
    await loadFixture('acceptance/one-prop', 'base');
  });

  it('should persist the toggle state', async () => {
    expect(await getHeaderToggledState()).to.not.contain('hidden');

    // TODO: the browser cache is not cleared between tests so this will leave
    // the header hidden for future tests. Figure out a way to clear the cache
    // - one possible solution is to create a session in beforeEach() instead of
    // before().
    await browser.click('.header .toggle');
    await loadFixture('acceptance/one-prop', 'base');

    expect(await getHeaderToggledState()).to.contain('hidden');
  });

  async function getHeaderToggledState() {
    return browser.getAttribute('.header .content', 'class');
  }
});
