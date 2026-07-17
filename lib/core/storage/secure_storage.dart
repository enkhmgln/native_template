import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorage {
  SecureStorage._() : storage = const FlutterSecureStorage();

  static final shared = SecureStorage._();

  final FlutterSecureStorage storage;

  Future<void> set(String key, String value) =>
      storage.write(key: key, value: value);

  Future<String?> data(String key) => storage.read(key: key);

  Future<void> delete(String key) => storage.delete(key: key);

  Future<bool> has(String key) async {
    final value = await data(key);
    return value != null && value.isNotEmpty;
  }

  Future<void> setJson(String key, Map<String, dynamic> value) =>
      set(key, jsonEncode(value));

  Future<Map<String, dynamic>?> jsonData(String key) async {
    final raw = await data(key);
    if (raw == null || raw.isEmpty) return null;

    final decoded = jsonDecode(raw);
    if (decoded is! Map<String, dynamic>) return null;
    return decoded;
  }

  Future<void> deleteAll() => storage.deleteAll();
}
