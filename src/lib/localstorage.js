import AbstractCache from 'src/lib/abstract-cache.js';
import store from 'store2';

/* eslint-disable class-methods-use-this */
export default class LocalStorage extends AbstractCache {
  constructor(namespace) {
    super(namespace);

    // Calling store.namespace() returns an empty string v0v.
    this.store = namespace ? store.namespace(namespace) : store;
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
