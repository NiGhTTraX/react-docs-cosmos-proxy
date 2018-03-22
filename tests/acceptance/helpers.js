import { sel } from '../unit/helpers/selectors.js';
/* global mugshot */

/**
 * Open the playground full screen on the given fixture.
 *
 * @param {String} component
 * @param {String} fixture
 */
export async function loadFixture(component, fixture) {
  // We can also click on the fixture in the fixtures list, but this is faster.
  await browser.url(`http://playground:8989/?component=${component}&fixture=${fixture}&fullScreen=true`);

  // Switch focus to the only frame on the page, the one displaying the
  // component.
  await browser.waitForVisible('iframe', 15 * 1000);
  const { value: loaderIframe } = await browser.element('iframe');
  await browser.frame(loaderIframe);
}

/**
 * Take a screenshot and test it for visual differences against the baseline.
 *
 * @param {String} name The name of the screenshot that will be saved to disk.
 * @param {String} [selector='body']
 *
 * @returns {Promise} Will resolve if there are no visual changes. Will be
 *   rejected if:
 *     1) there are visual differences, in which case corresponding .diff.png
 *     and .new.png files will be created,
 *     2) there's a failure in taking the screenshot or
 *     3) there's no baseline to compare against.
 */
export async function checkForVisualChanges(name, selector = 'body') {
  await browser.waitForVisible(selector, 15 * 1000);
  return new Promise((resolve, reject) => {
    try {
      // eslint-disable-next-line consistent-return
      mugshot.test({ name, selector }, (err, result) => {
        if (err) {
          return reject(err);
        }

        if (!result.isEqual) {
          return reject(new Error('Visual changes detected. Check screenshots'));
        }

        resolve();
      });
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Create a test suite that takes screenshots after each test in it.
 *
 * You should not nest these as you'll get duplicate screenshots.
 *
 * @param {String} name The name of the suite.
 * @param {Function} suite The implementation of the suite. Will be called
 *   on a Mocha context representing the suite and it will receive the `it`
 *   method as the first argument. The `it` method works exactly the same as in
 *   Mocha. You can use suite hooks like `beforeEach` and `afterEach`, but you
 *   must use the provided `it` method instead of the Mocha global one.
 */
export function mugshotSuite(name, suite) {
  function takeScreenshot(screenshotName) {
    // Screenshots failing will make debugging noisier than it needs to be.
    if (process.env.DEBUG) {
      return;
    }

    // eslint-disable-next-line consistent-return
    return checkForVisualChanges(
      screenshotName,
      // TODO: refactor this out
      sel('docs-proxy')
    );
  }

  let itCalled = false;

  describe(name, function() {
    suite.call(this, function mugshotIt(testName, test) {
      itCalled = true;

      it(testName, function() {
        return Promise.resolve(test.call(this))
          .then(() => takeScreenshot(this.test.fullTitle()));
      });
    });
  });

  if (!itCalled) {
    throw new Error(`No tests were defined in Mugshot suite '${name}'.
Make sure you're calling the provided 'it' method and not the global
Mocha one.`);
  }
}
