/**
 * Volatile persistent key value store.
 */
export default class AbstractCache {
  /**
   * @param {String} key
   *
   * @returns {*}
   */
  get(key) {
    const value = this._get(key);

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
    this._set(key, JSON.stringify(value));
  }

  clear() {
    this._clear();
  }
}
