// import '/client/_.dart';
import '/components/_.dart';
// import '/core/constants/_.dart';
import '/screens/_.dart';
import 'app_pages.dart';

abstract final class AppNavigator {
  AppNavigator._();

  static void toInitial() {
    Get.offAllNamed(AppPages.initial);
  }

  static void back() => Get.back();
}
