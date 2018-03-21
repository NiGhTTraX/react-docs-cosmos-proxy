/**
 * @fileoverview Take a screenshot for every fixture.
 */
import { getComponents } from 'react-cosmos-voyager2/lib/client';
import { findFixtureFiles } from 'react-cosmos-voyager2/lib/server';
import { getCosmosConfig } from 'react-cosmos-config';
import { importModule } from 'react-cosmos-shared';
import { loadFixture, mugshotSuite } from 'tests/acceptance/helpers.js';

const {
  rootPath,
  fileMatch,
  exclude
} = getCosmosConfig('playground/cosmos.config.js');

function getFixtureModules(fixtureFiles) {
  return fixtureFiles.reduce(
    (acc, f) => ({
      ...acc,
      [f.filePath]: importModule(require(f.filePath)) // eslint-disable-line
    }
    ),
    {}
  );
}

describe('fixtures test', async() => {
  const fixtureFiles = await findFixtureFiles({
    rootPath,
    fileMatch,
    exclude
  });
  const fixtureModules = getFixtureModules(fixtureFiles);
  const components = getComponents({ fixtureModules, fixtureFiles });

  components.forEach(component => {
    const componentName = `${component.namespace}/${component.name}`;
    mugshotSuite(componentName.replace(/\//g, '_'), it => {
      component.fixtures.forEach(fixture => {
        it(fixture.name, async () => {
          await loadFixture(`${componentName}`, fixture.name);
        });
      });
    });
  });
});
