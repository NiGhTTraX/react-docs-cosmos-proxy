/**
 * @fileoverview Take a screenshot for every fixture.
 */
import getFilePaths from 'react-cosmos-voyager';
import cosmosConfig from 'playground/cosmos.config.js';
import { loadFixture, mugshotSuite } from 'tests/acceptance/helpers.js';

// Thank you @skidding!
const { components, fixtures } = getFilePaths(cosmosConfig);

Object.keys(components)
  // Some components might not have fixtures yet.
  .filter(component => Object.keys(fixtures[component]).length)
  .forEach(component => {
    mugshotSuite(component.replace(/\//g, '_'), it => {
      Object.keys(fixtures[component])
        .forEach(fixture => {
          it(fixture, async () => {
            await loadFixture(component, fixture);
          });
        });
    });
  });
