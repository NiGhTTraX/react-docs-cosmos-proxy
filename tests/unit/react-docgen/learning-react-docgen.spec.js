import { transform } from 'babel-core';

describe('Learning react-docgen', () => {
  /**
   * A react-docgen output test for prop types.
   * @typedef propTypeTest
   *
   * @property {String} name The name of the test.
   * @property {String} propTypes The literal string representation of the
   *   prop types e.g. `foo: PropType.string`.
   * @property {*} output The expected output, grabbed from __docgenInfo.
   */

  /**
   * @type {propTypeTest[]}
   */
  const propTests = [{
    name: 'a string prop',
    propTypes: 'string: PropTypes.string',
    output: {
      string: {
        type: {
          name: 'string'
        },
        required: false,
        description: ''
      }
    }
  }, {
    name: 'a number prop',
    propTypes: 'number: PropTypes.number',
    output: {
      number: {
        type: {
          name: 'number'
        },
        required: false,
        description: ''
      }
    }
  }, {
    name: 'a boolean prop',
    propTypes: 'boolean: PropTypes.bool',
    output: {
      boolean: {
        type: {
          name: 'bool'
        },
        required: false,
        description: ''
      }
    }
  }, {
    name: 'multiple props',
    propTypes: `
      prop1: PropTypes.string,
      prop2: PropTypes.number
    `,
    output: {
      prop1: {
        type: {
          name: 'string'
        },
        required: false,
        description: ''
      },
      prop2: {
        type: {
          name: 'number'
        },
        required: false,
        description: ''
      }
    }

  }];

  propTests.forEach(({ name, propTypes, output }) => {
    it(`should generate something known for ${name}`, () => {
      // This needs to be declared here so eval can see it.
      const Foo = { __docgenInfo: null };

      // eslint-disable-next-line no-eval
      eval(generateAndCompileCode(propTypes, 'Foo'));

      // TODO: why is docgenInfo an array?
      expect(Foo.__docgenInfo[0].props).to.deep.equal(output);
    });
  });

  /**
   * @param {String} propTypes
   * @param {String} componentName
   *
   * @returns {String}
   */
  function generateCode(propTypes, componentName) {
    return `
        const { Component } = require('react');
        const PropTypes = require('prop-types');
    
        ${componentName} = class ${componentName} extends Component {
            render() { return null; }
        }
        
        ${componentName}.propTypes = {
          ${propTypes}
        };
        
        // Needed or else docgen won't pick up the component.
        // Doesn't work with module.exports.
        export default ${componentName};
    `;
  }

  /**
   * @param {String} code
   *
   * @returns {String}
   */
  function compileCodeWithDocgen(code) {
    const { code: compiledCode } = transform(code, {
      babelrc: false,
      presets: ['env'],
      plugins: ['transform-class-properties', ['react-docgen', {
        resolver: 'findAllComponentDefinitions'
      }]]
    });

    return compiledCode;
  }

  /**
   * @param {String} propTypes
   * @param {String} componentName
   *
   * @returns {String}
   */
  function generateAndCompileCode(propTypes, componentName) {
    return compileCodeWithDocgen(
      generateCode(propTypes, componentName)
    );
  }
});
