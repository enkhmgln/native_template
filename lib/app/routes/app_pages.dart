import 'package:get/get.dart';
import '/core/shared/_.dart';
import '/screens/_.dart';

abstract final class AppPages {
  AppPages._();

  static String get splash => SplashView.routeName;

  // static String get initial => SessionManager.isLogged
  //     ? TabbarView.routeName
  //     : DeviceManager.isOnboardingComplete
  //     ? LoginView.routeName
  //     : WalkthroughView.routeName;
  static String get initial => SplashView.routeName;

  static final List<GetPage<dynamic>> routes = [
    GetPage(
      name: SplashView.routeName,
      page: () => const SplashView(),
      binding: SplashBinding(),
    ),
  ];
}
