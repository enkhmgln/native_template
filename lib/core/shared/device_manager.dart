import 'package:device_info_plus/device_info_plus.dart';
import 'package:flutter/foundation.dart';
import '/core/constants/_.dart';
import '/core/storage/_.dart';
import 'package:package_info_plus/package_info_plus.dart';

class DeviceManager {
  DeviceManager._();

  static final deviceInfo = DeviceInfoPlugin();

  static bool get isOnboardingComplete =>
      StoreManager.shared.data<bool>(AppConstants.kOnboardingComplete) ?? false;

  static String get os => switch (defaultTargetPlatform) {
    TargetPlatform.android => 'android',
    TargetPlatform.iOS => 'ios',
    _ => '',
  };

  static Future<String> get deviceId async {
    return switch (defaultTargetPlatform) {
      TargetPlatform.android => (await deviceInfo.androidInfo).id,
      TargetPlatform.iOS =>
        (await deviceInfo.iosInfo).identifierForVendor ?? '',
      _ => '',
    };
  }

  static Future<String> get deviceModel async {
    return switch (defaultTargetPlatform) {
      TargetPlatform.android => (await deviceInfo.androidInfo).model,
      TargetPlatform.iOS => (await deviceInfo.iosInfo).model,
      _ => '',
    };
  }

  static Future<String> get version async {
    return (await PackageInfo.fromPlatform()).version;
  }

  static Future<String> get buildNumber async {
    return (await PackageInfo.fromPlatform()).buildNumber;
  }

  static Future<String> get appVersion async {
    final packageInfo = await PackageInfo.fromPlatform();
    return '${packageInfo.version} (${packageInfo.buildNumber})';
  }
}
