import { loadFixture } from 'tests/acceptance/helpers.js';

describe('Header', () => {
  beforeEach(async () => {
    await loadFixture('playground/components/acceptance/OneProp', 'base');
    await browser.waitForVisible('.header .content', 15 * 1000);
  });

  it('should persist the toggle state', async () => {
    expect(await getHeaderToggledState()).to.not.contain('hidden');
    await browser.click('.header .toggle');
    await loadFixture('playground/components/acceptance/OneProp', 'base');

    expect(await getHeaderToggledState()).to.contain('hidden');
  });

  async function getHeaderToggledState() {
    return browser.getAttribute('.header .content', 'class');
  }
  afterEach(async () => {
    await browser.execute('localStorage.clear()');
  });
});
