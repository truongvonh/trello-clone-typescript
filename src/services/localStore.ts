export class LocalStoreService {
  storage = localStorage;

  getParse<T>(key: string) {
    try {
      const data = this.storage.getItem(key);
      const result: T | null = JSON.parse(data || 'null');
      return result;
    } catch (e) {
      console.debug('Error when get parse local storage!');
    }
  }

  getString(key: string) {
    try {
      return this.storage.getItem(key);
    } catch (e) {
      console.debug('Error when get string local storage!');
    }
  }

  set<T>(key: string, value: T) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.debug('Error when set local storage!');
    }
  }

  deleteItem(key: string) {
    return this.storage.removeItem(key);
  }
}
