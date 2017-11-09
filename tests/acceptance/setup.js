import { remote } from 'webdriverio';
import Mugshot from 'mugshot';
import WebdriverIOAdapter from 'mugshot-webdriverio';
import path from 'path';
import fs from 'fs';
import 'tests/unit/helpers/expect.js';

const { BROWSER } = process.env;
let mugshot;

// TODO: WebdriverIO's maintainer is an ass. See
// https://github.com/webdriverio/webdriverio/issues/2076.
const wdioDeprecatedCommands = new Set();
const wdioDeprecationWarning = /^WARNING: the "(\w+)" command will be depcrecated soon. Please use a different command in order to avoid failures in your test after updating WebdriverIO/; // [sic]
const { warn } = console;
console.warn = (message, ...args) => {
  const match = message.match(wdioDeprecationWarning);
  if (match) {
    wdioDeprecatedCommands.add(match[1]);

    return;
  }

  warn.call(console, message, ...args);
};

before('Connecting to Selenium', function() {
  this.timeout(10 * 1000);

  const options = {
    host: 'selenium',
    desiredCapabilities: { browserName: BROWSER }
  };

  const client = remote(options).init();
  const adapter = new WebdriverIOAdapter(client);

  mugshot = new Mugshot(adapter, {
    rootDirectory: path.join(__dirname, 'screenshots', BROWSER),
    acceptFirstBaseline: false
  });

  // Because these are singletons created once before all the tests they're
  // exposed globally for ease of use.
  global.browser = client;
  global.mugshot = mugshot;

  return client;
});

beforeEach('Waiting for app to render', function() {
  return global.browser.url('http://playground:8989/')
    // Wait for the playground to be up.
    .then(() => global.browser.waitForVisible('[class*=__header__]', 5 * 1000));
});

afterEach('coverage', async function() {
  const { value: coverage } = await browser.execute(function getCoverage() {
    return JSON.stringify(window.__coverage__);
  });

  const name = this.currentTest.fullTitle();

  fs.writeFileSync(
    path.join(__dirname, 'results', 'coverage', `${BROWSER}_${name}.json`),
    coverage
  );
});

after(function() {
  if (wdioDeprecatedCommands.size) {
    console.info('The tests used the following \'deprecated\' WDIO commands:');
    console.info(' ', Array.from(wdioDeprecatedCommands.values()).join(', '));
  }

  return global.browser.end();
});
