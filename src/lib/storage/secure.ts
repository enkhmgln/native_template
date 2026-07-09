import * as SecureStore from "expo-secure-store";

export const secureStore = {
  async get(key: string) {
    return SecureStore.getItemAsync(key);
  },

  async set(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  },

  async remove(key: string) {
    await SecureStore.deleteItemAsync(key);
  },

  async removeMany(keys: string[]) {
    await Promise.all(keys.map((key) => secureStore.remove(key)));
  },

  async getJson<T>(key: string) {
    const raw = await secureStore.get(key);
    if (!raw) return null;

    return JSON.parse(raw) as T;
  },

  async setJson<T>(key: string, value: T) {
    await secureStore.set(key, JSON.stringify(value));
  },
};
