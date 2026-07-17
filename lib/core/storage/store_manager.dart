import 'package:get_storage/get_storage.dart';
import '/core/constants/_.dart';

class StoreManager {
  StoreManager._();

  static final shared = StoreManager._();

  GetStorage? box;

  GetStorage get store {
    final current = box;
    if (current == null) {
      throw StateError('StoreManager not initialized. Call init() first.');
    }
    return current;
  }

  Future<void> init() async {
    if (box != null) return;
    await GetStorage.init(AppConstants.kAppStore);
    box = GetStorage(AppConstants.kAppStore);
  }

  Map<String, dynamic>? mapData(String key) {
    final value = store.read(key);
    if (value is Map) return Map<String, dynamic>.from(value);
    return null;
  }

  Map<String, dynamic>? jsonData(String key) => mapData(key);

  List<Map<String, dynamic>> listMapData(String key) {
    final list = store.read(key);
    if (list is! List) return [];
    return list
        .map(
          (e) => e is Map ? Map<String, dynamic>.from(e) : <String, dynamic>{},
        )
        .toList();
  }

  T? data<T>(String key) {
    final value = store.read(key);
    return value is T ? value : null;
  }

  bool hasData(String key) => store.hasData(key);

  Future<void> write(String key, dynamic value) async =>
      store.write(key, value);

  Future<void> deleteKey(String key) async => store.remove(key);

  Future<void> deleteStore() async => store.erase();
}
