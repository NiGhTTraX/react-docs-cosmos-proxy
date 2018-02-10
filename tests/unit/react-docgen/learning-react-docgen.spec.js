import { transform } from 'babel-core';

describe('Learning react-docgen', () => {
  it('should generate something for a string prop', () => {
    const info = getDocgenInfo('primitive: PropTypes.string');

    expect(info).to.deep.equal([{
      description: '',
      methods: [],
      props: {
        primitive: {
          type: {
            name: 'string'
          },
          required: false,
          description: ''
        }
      }
    }]);
  });

  it('should generate something for a number prop', () => {
    const info = getDocgenInfo('primitive: PropTypes.number');

    expect(info).to.deep.equal([{
      description: '',
      methods: [],
      props: {
        primitive: {
          type: {
            name: 'number'
          },
          required: false,
          description: ''
        }
      }
    }]);
  });

  it('should generate something for a boolean prop', () => {
    const info = getDocgenInfo('primitive: PropTypes.bool');

    expect(info).to.deep.equal([{
      description: '',
      methods: [],
      props: {
        primitive: {
          type: {
            name: 'bool'
          },
          required: false,
          description: ''
        }
      }
    }]);
  });


  it('should generate something for a required prop', () => {
    const info = getDocgenInfo('primitive: PropTypes.string.isRequired');

    expect(info).to.deep.equal([{
      description: '',
      methods: [],
      props: {
        primitive: {
          type: {
            name: 'string'
          },
          required: true,
          description: ''
        }
      }
    }]);
  });

  it('should generate something for multiple props', () => {
    const info = getDocgenInfo(`
      prop1: PropTypes.string,
      prop2: PropTypes.number
    `);

    expect(info).to.deep.equal([{
      description: '',
      methods: [],
      props: {
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
    }]);
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

  /**
   * @param {String} propTypes
   *
   * @returns {*}
   */
  function getDocgenInfo(propTypes) {
    // This needs to be declared here so eval can see it.
    // It's also initialized with a dummy value to make it look like the
    // __docgenInfo property access below is 'valid'.
    const Foo = {};

    // eslint-disable-next-line no-eval
    eval(generateAndCompileCode(propTypes, 'Foo'));

    return Foo.__docgenInfo;
  }
});
