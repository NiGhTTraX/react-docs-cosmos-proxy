import LocalStorage from 'src/lib/localstorage.js';

const Implementations = [
  ['LocalStorage', LocalStorage]
];

Implementations.forEach(([name, Implementation]) => describe(name, () => {
  let instance;

  describe('no namespace', () => {
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
}));
