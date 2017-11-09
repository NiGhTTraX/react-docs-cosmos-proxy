import AbstractCache from 'src/lib/abstract-cache.js';
import store from 'store2';

/* eslint-disable class-methods-use-this */
export default class LocalStorage extends AbstractCache {
  constructor(namespace) {
    super(namespace);

    this.store = store.namespace(namespace);
  }

  _get(key) {
    return this.store.get(key);
  }

  _set(key, value) {
    this.store.set(key, value);
  }

  _clear() {
    this.store.clear();
  }
}
