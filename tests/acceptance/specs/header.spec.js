import { loadFixture } from 'tests/acceptance/helpers.js';

describe('Header', () => {
  beforeEach(async () => {
    await loadFixture('playground/components/acceptance/OneProp', 'base');
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
    try {
      await browser.localStorage('DELETE');
    } catch (err) {
    // reset if we can't clear local storage
      await browser.click('.header .toggle');
    }
  });
});
