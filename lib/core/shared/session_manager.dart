// import '/app/routes/_.dart';
// import '/client/models/_.dart';
import '/core/constants/_.dart';
import '/core/storage/_.dart';

class SessionManager {
  SessionManager._();

  static Future<String?> get accessToken =>
      SecureStorage.shared.data(AppConstants.kToken);

  static Future<String?> get refreshToken =>
      SecureStorage.shared.data(AppConstants.kRefreshToken);

  // static bool get isLogged => user != null;

  // static User? get user {
  //   final json = StoreManager.shared.jsonData(AppConstants.kUser);
  //   if (json == null) return null;
  //   return User.fromJson(json);
  // }

  // static Future<void> saveSession(AuthSessionResponse session) async {
  //   await saveTokens(
  //     accessToken: session.accessToken,
  //     refreshToken: session.refreshToken,
  //     accessTokenExpiresAt: session.accessTokenExpiresAt,
  //     refreshTokenExpiresAt: session.refreshTokenExpiresAt,
  //   );
  //   await saveUser(session.user);
  // }

  // static Future<void> saveUser(User user) =>
  //     StoreManager.shared.write(AppConstants.kUser, user.toJson());

  static Future<void> saveTokens({
    required String accessToken,
    required String refreshToken,
    required String accessTokenExpiresAt,
    required String refreshTokenExpiresAt,
  }) async {
    await SecureStorage.shared.set(AppConstants.kToken, accessToken);
    await SecureStorage.shared.set(AppConstants.kRefreshToken, refreshToken);
    await SecureStorage.shared.set(
      AppConstants.kAccessTokenExpiresAt,
      accessTokenExpiresAt,
    );
    await SecureStorage.shared.set(
      AppConstants.kRefreshTokenExpiresAt,
      refreshTokenExpiresAt,
    );
  }

  static Future<void> clearSession() async {
    await SecureStorage.shared.delete(AppConstants.kToken);
    await SecureStorage.shared.delete(AppConstants.kRefreshToken);
    await SecureStorage.shared.delete(AppConstants.kAccessTokenExpiresAt);
    await SecureStorage.shared.delete(AppConstants.kRefreshTokenExpiresAt);
    await StoreManager.shared.deleteKey(AppConstants.kUser);
  }

  static Future<void> logout() async {
    await clearSession();
    // AppNavigator.toLogin();
  }
}
