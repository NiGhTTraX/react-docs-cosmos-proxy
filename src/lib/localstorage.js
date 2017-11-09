import AbstractCache from 'src/lib/abstract-cache.js';

/* eslint-disable class-methods-use-this */
export default class LocalStorage extends AbstractCache {
  _get(key) {
    return window.localStorage.getItem(key);
  }

  _set(key, value) {
    window.localStorage.setItem(key, value);
  }

  _clear() {
    window.localStorage.clear();
  }
}
