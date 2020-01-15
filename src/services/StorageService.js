import { AsyncStorage } from 'react-native';

class Storage {

  storage = AsyncStorage;

  async getSingle(key, opts) {
    return JSON.parse(await this.storage.getItem(key));
  }
  get = this.getSingle

  async setSingle(key, value, opts) {
    return this.storage.setItem(key, JSON.stringify(value));
  }
  set = this.setSingle

  async getMany(keys, opts) {
    return (await this.storage.multiGet(keys)).reduce((obj, [k, v]) => {
      obj[k] = JSON.parse(v);
      return obj;
    }, {});
  }

  async setMany(values, opts) {
    return this.storage.multiSet(values.map(obj => {
      const key = Object.getOwnPropertyNames(obj)[0];
      if (!key) return [];
      return [key, obj[key]]
    }))
  }

  async removeSingle(key, opts) {
    return this.storage.removeItem(key);
  }

  async removeMany(keys, opts) {
    return this.storage.multiRemove(keys)
  }

  async getKeys(opts) {
    return this.storage.getAllKeys();
  }

  async dropStorage(opts) {
    return this.storage.clear();
  }
}

export default new Storage();
