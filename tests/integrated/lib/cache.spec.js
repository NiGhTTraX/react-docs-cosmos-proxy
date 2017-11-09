import LocalStorage from 'src/lib/localstorage.js';

const Implementations = [
  ['LocalStorage', LocalStorage]
];

Implementations.forEach(([name, Implementation]) => describe(name, () => {
  describe('no namespace', () => {
    let instance;

    beforeEach(() => {
      instance = new Implementation();
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
  });

  describe('namespaced', () => {
    let ns1, ns2;

    beforeEach(() => {
      ns1 = new Implementation('namespace1');
      ns2 = new Implementation('namespace2');
    });

    it('should not have collisions between namespaces', () => {
      ns1.set('foo', 1);
      ns2.set('foo', 2);

      expect(ns1.get('foo')).to.equal(1);
      expect(ns2.get('foo')).to.equal(2);
    });

    it('should not clear other namespaces', () => {
      ns1.set('foo', 1);
      ns2.set('foo', 2);

      ns1.clear();

      expect(ns1.get('foo')).to.be.undefined;
      expect(ns2.get('foo')).to.equal(2);
    });
  });

  describe('warm cache', () => {
    let coldCache, warmCache;

    beforeEach(() => {
      coldCache = new Implementation('ns');
      coldCache.set('foo', 'bar');

      warmCache = new Implementation('ns');
    });

    it('should share storage between instances with the same namespace', () => {
      expect(warmCache.get('foo')).to.equal('bar');
    });

    it('should clear all instances with the same namespace', () => {
      warmCache.clear();

      expect(coldCache.get('foo')).to.be.undefined;
    });
  });
}));
