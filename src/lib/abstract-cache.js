/**
 * Volatile persistent key value store.
 */
export default class AbstractCache {
  /**
   * @param {String} namespace All of the keys will be namespaced with this.
   */
  constructor(namespace = '') {
    this.namespace = namespace;
  }

  /**
   * @param {String} key
   *
   * @returns {*}
   */
  get(key) {
    const value = this._get(this._getNamespacedKey(key));

    if (value === null) {
      return undefined;
    }

    return JSON.parse(value);
  }

  /**
   * @param {String} key
   * @param {*} value
   */
  set(key, value) {
    this._set(this._getNamespacedKey(key), JSON.stringify(value));
  }

  clear() {
    this._clear();
  }

  _getNamespacedKey(key) {
    return `${this.namespace}_${key}`;
  }
}
