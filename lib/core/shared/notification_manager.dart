import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/foundation.dart';
import '/core/constants/_.dart';
import '/core/storage/_.dart';

abstract final class NotificationManager {
  NotificationManager._();

  static bool initialized = false;

  static Future<void> init() async {
    if (initialized) return;
    initialized = true;

    try {
      final settings = await FirebaseMessaging.instance.requestPermission(
        alert: true,
        badge: true,
        sound: true,
      );
      debugPrint('FCM permission: ${settings.authorizationStatus}');

      if (!kIsWeb && defaultTargetPlatform == TargetPlatform.iOS) {
        await FirebaseMessaging.instance
            .setForegroundNotificationPresentationOptions(
              alert: true,
              badge: true,
              sound: true,
            );
      }

      await refreshToken();

      FirebaseMessaging.instance.onTokenRefresh.listen((token) async {
        await persistToken(token);
        debugPrint('FCM token refreshed');
      });
    } catch (error, stackTrace) {
      debugPrint('NotificationManager init failed: $error');
      debugPrintStack(stackTrace: stackTrace);
    }
  }

  static Future<String?> get fcmToken async =>
      StoreManager.shared.data<String>(AppConstants.kFcmToken);

  static Future<void> refreshToken() async {
    final token = await FirebaseMessaging.instance.getToken();
    if (token == null || token.isEmpty) {
      debugPrint('FCM token empty (simulator, no permission, or no APNs)');
      return;
    }

    await persistToken(token);
    debugPrint('FCM token saved');
  }

  static Future<void> persistToken(String token) =>
      StoreManager.shared.write(AppConstants.kFcmToken, token);
}
