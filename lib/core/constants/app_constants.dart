import 'package:flutter/foundation.dart';

abstract final class AppConstants {
  static const appName = 'Rebox';
  static const appLogo = 'app_logo.png';
  static const domain = 'http://localhost:8080';
  static bool get isDebugMode => kDebugMode;
  static const kAppStore = 'kAppStore';
  static const kToken = 'kToken';
  static const kRefreshToken = 'kRefreshToken';
  static const kAccessTokenExpiresAt = 'kAccessTokenExpiresAt';
  static const kRefreshTokenExpiresAt = 'kRefreshTokenExpiresAt';
  static const kUser = 'kUser';
  static const kOnboardingComplete = 'kOnboardingComplete';
  static const kFcmToken = 'kFcmToken';
}
