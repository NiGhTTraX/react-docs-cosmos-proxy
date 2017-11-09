import LocalStorage from 'src/lib/localstorage.js';

const Implementations = [
  ['LocalStorage', LocalStorage]
];

Implementations.forEach(([name, Implementation]) => describe(name, () => {
  let instance;

  beforeEach(() => {
    instance = new Implementation('namespace');
  });

  afterEach(() => {
    instance.clear();
  });

  it('should not return an undefined key', () => {
    expect(instance.get('undefined')).to.be.undefined;
  });

  it('should set a simple value', () => {
    instance.set('simple', 1);

    expect(instance.get('simple')).to.equal(1);
  });

  it('should set a complex value', () => {
    instance.set('complex', { foo: 'bar' });

    expect(instance.get('complex')).to.deep.equal({ foo: 'bar' });
  });

  it('should clear everything', () => {
    instance.set('you-see-me', 'now');

    instance.clear();

    expect(instance.get('you-see-me')).to.be.undefined;
  });

  describe('collissions', () => {
    let instance2;

    beforeEach(() => {
      instance2 = new Implementation('namespace2');
    });

    it('should not have collisions between namespaces', () => {
      instance.set('foo', 1);
      instance2.set('foo', 2);

      expect(instance.get('foo')).to.equal(1);
      expect(instance2.get('foo')).to.equal(2);
    });

    it('should not clear other namespaces', () => {
      instance.set('foo', 1);
      instance2.set('foo', 2);

      instance.clear();

      expect(instance.get('foo')).to.be.undefined;
      expect(instance2.get('foo')).to.equal(2);
    });
  });

  describe('warm cache', () => {
    let warmCache;

    beforeEach(() => {
      instance.set('foo', 'bar');

      warmCache = new Implementation('namespace');
    });

    it('should share storage between instances with the same namespace', () => {
      expect(warmCache.get('foo')).to.equal('bar');
    });

    it('should clear all instances with the same namespace', () => {
      warmCache.clear();

      expect(instance.get('foo')).to.be.undefined;
    });
  });
}));
