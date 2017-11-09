import AbstractCache from 'src/lib/abstract-cache.js';

/* eslint-disable class-methods-use-this */
export default class LocalStorage extends AbstractCache {
  keys = new Set();

  _get(key) {
    return window.localStorage.getItem(key);
  }

  _set(key, value) {
    this.keys.add(key);

    window.localStorage.setItem(key, value);
  }

  _clear() {
    this.keys.forEach(key => window.localStorage.removeItem(key));
  }
}
