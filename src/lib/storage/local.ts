import AsyncStorage from "@react-native-async-storage/async-storage";

export const localStore = {
  async get(key: string) {
    return AsyncStorage.getItem(key);
  },

  async set(key: string, value: string) {
    await AsyncStorage.setItem(key, value);
  },

  async remove(key: string) {
    await AsyncStorage.removeItem(key);
  },

  async removeMany(keys: string[]) {
    await Promise.all(keys.map((key) => localStore.remove(key)));
  },

  async getJson<T>(key: string) {
    const raw = await localStore.get(key);
    if (!raw) return null;

    return JSON.parse(raw) as T;
  },

  async setJson<T>(key: string, value: T) {
    await localStore.set(key, JSON.stringify(value));
  },
};
